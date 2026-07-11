import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("Next static export directory `out` was not created.");
}

rmSync("dist", { force: true, recursive: true });
cpSync("out", "dist", { recursive: true });
mkdirSync("dist/client", { recursive: true });
cpSync("out", "dist/client", { recursive: true });

mkdirSync("dist/.openai", { recursive: true });
cpSync(".openai/hosting.json", "dist/.openai/hosting.json");

mkdirSync("dist/server", { recursive: true });
writeFileSync(
  "dist/server/index.js",
  `const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function contentType(pathname) {
  const match = pathname.match(/\\.[^.\\/]+$/);
  return match ? CONTENT_TYPES[match[0]] ?? "application/octet-stream" : "text/html; charset=utf-8";
}

function withHtmlFallback(pathname) {
  if (pathname === "/") {
    return ["/index.html", "/client/index.html"];
  }

  if (pathname.endsWith("/")) {
    return [pathname + "index.html", "/client" + pathname + "index.html"];
  }

  if (pathname.includes(".")) {
    return [pathname, "/client" + pathname];
  }

  return [
    pathname,
    pathname + ".html",
    pathname + "/index.html",
    "/client" + pathname,
    "/client" + pathname + ".html",
    "/client" + pathname + "/index.html",
  ];
}

async function fetchCloudflareAsset(candidate, env) {
  if (!env?.__STATIC_CONTENT) {
    return null;
  }

  const manifest =
    typeof env.__STATIC_CONTENT_MANIFEST === "string"
      ? JSON.parse(env.__STATIC_CONTENT_MANIFEST)
      : env.__STATIC_CONTENT_MANIFEST ?? {};
  const key = candidate.replace(/^\\//, "");
  const manifestKey = manifest[key] ?? manifest["/" + key] ?? key;
  const body = await env.__STATIC_CONTENT.get(manifestKey, "stream");

  if (!body) {
    return null;
  }

  return new Response(body, {
    headers: {
      "content-type": contentType(candidate),
    },
  });
}

async function fetchAsset(request, env, pathname) {
  const url = new URL(request.url);

  for (const candidate of withHtmlFallback(pathname)) {
    if (env?.ASSETS) {
      url.pathname = candidate;
      const response = await env.ASSETS.fetch(new Request(url, request));

      if (response.status !== 404) {
        if (candidate.endsWith(".html")) {
          const headers = new Headers(response.headers);
          headers.set("content-type", contentType(candidate));
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }

        return response;
      }
    }

    const cloudflareAsset = await fetchCloudflareAsset(candidate, env);

    if (cloudflareAsset) {
      return cloudflareAsset;
    }
  }

  if (env?.ASSETS) {
    url.pathname = "/404.html";
    const notFound = await env.ASSETS.fetch(new Request(url, request));
    return new Response(notFound.body, {
      status: 404,
      headers: notFound.headers,
    });
  }

  const notFound =
    (await fetchCloudflareAsset("/404.html", env)) ??
    (await fetchCloudflareAsset("/client/404.html", env));
  return new Response(notFound?.body ?? "Not found", {
    status: 404,
    headers: {
      "content-type": notFound?.headers.get("content-type") ?? "text/plain; charset=utf-8",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
          status: 405,
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      }

      let values;

      try {
        values = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: "Некорректный формат заявки." }), {
          status: 400,
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      }

      const errors = {};

      if (!values?.name?.trim()) {
        errors.name = "Укажите имя";
      }

      if (!values?.contact?.trim()) {
        errors.contact = "Оставьте email, телефон или ник в мессенджере";
      }

      if (!values?.message?.trim()) {
        errors.message = "Коротко расскажите о проекте";
      }

      if (Object.keys(errors).length > 0) {
        return new Response(JSON.stringify({ errors }), {
          status: 400,
          headers: { "content-type": "application/json; charset=utf-8" },
        });
      }

      return new Response(
        JSON.stringify({
          error:
            "Отправка email ещё не настроена на production. Напишите в Telegram, WhatsApp или подключите HTTP-почтовый сервис.",
        }),
        {
          status: 503,
          headers: { "content-type": "application/json; charset=utf-8" },
        },
      );
    }

    const response = await fetchAsset(request, env, url.pathname);

    if (response) {
      return response;
    }

    return new Response("Static assets binding is unavailable.", {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
`,
);
