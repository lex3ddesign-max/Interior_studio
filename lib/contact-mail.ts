import type { ContactFormValues } from "@/lib/contact";

export const CONTACT_FORM_RECIPIENT =
  process.env.CONTACT_TO_EMAIL ?? "alex3ddesign@yandex.ru";

export type ContactEmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
};

export type ContactEmailMessage = {
  to: string;
  subject: string;
  text: string;
};

type ContactEmailEnv = Record<string, string | undefined>;

export function getContactEmailConfig(env: ContactEmailEnv): ContactEmailConfig {
  const host = env.SMTP_HOST?.trim();
  const port = Number(env.SMTP_PORT ?? "465");
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.trim();

  if (!host || !user || !pass || Number.isNaN(port)) {
    throw new Error("SMTP configuration is missing");
  }

  return {
    host,
    port,
    user,
    pass,
    secure: env.SMTP_SECURE ? env.SMTP_SECURE !== "false" : port === 465,
  };
}

export function buildContactEmail(values: ContactFormValues): ContactEmailMessage {
  const materials = values.materials.trim() || "Не указаны";

  return {
    to: CONTACT_FORM_RECIPIENT,
    subject: `Новая заявка AVENOR — ${values.name.trim()}`,
    text: [
      "Новая заявка с сайта AVENOR",
      "",
      `Имя: ${values.name.trim()}`,
      `Контакт: ${values.contact.trim()}`,
      "",
      "Проект:",
      values.message.trim(),
      "",
      `Ссылка на материалы: ${materials}`,
    ].join("\n"),
  };
}

export async function sendContactEmail(values: ContactFormValues) {
  const config = getContactEmailConfig(process.env);
  const message = buildContactEmail(values);
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"AVENOR" <${config.user}>`,
    to: message.to,
    subject: message.subject,
    text: message.text,
    replyTo: values.contact.includes("@") ? values.contact.trim() : undefined,
  });
}
