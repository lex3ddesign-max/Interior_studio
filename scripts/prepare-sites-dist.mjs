import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("Next static export directory `out` was not created.");
}

rmSync("dist", { force: true, recursive: true });
cpSync("out", "dist", { recursive: true });

mkdirSync("dist/.openai", { recursive: true });
cpSync(".openai/hosting.json", "dist/.openai/hosting.json");

mkdirSync("dist/server", { recursive: true });
writeFileSync(
  "dist/server/index.js",
  `const HTML_HEADERS = {
  "content-type": "text/html; charset=utf-8",
};

function withHtmlFallback(pathname) {
  if (pathname === "/") {
    return ["/index.html"];
  }

  if (pathname.endsWith("/")) {
    return [pathname + "index.html"];
  }

  if (pathname.includes(".")) {
    return [pathname];
  }

  return [pathname, pathname + ".html", pathname + "/index.html"];
}

async function fetchAsset(request, env, pathname) {
  if (!env?.ASSETS) {
    return null;
  }

  const url = new URL(request.url);

  for (const candidate of withHtmlFallback(pathname)) {
    url.pathname = candidate;
    const response = await env.ASSETS.fetch(new Request(url, request));

    if (response.status !== 404) {
      if (candidate.endsWith(".html")) {
        const headers = new Headers(response.headers);
        headers.set("content-type", HTML_HEADERS["content-type"]);
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      return response;
    }
  }

  url.pathname = "/404.html";
  const notFound = await env.ASSETS.fetch(new Request(url, request));
  return new Response(notFound.body, {
    status: 404,
    headers: notFound.headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
