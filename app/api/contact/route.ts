import { NextResponse } from "next/server";

import {
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact";
import { sendContactEmail } from "@/lib/contact-mail";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let values: ContactFormValues;

  try {
    values = (await request.json()) as ContactFormValues;
  } catch {
    return NextResponse.json(
      { error: "Некорректный формат заявки." },
      { status: 400 },
    );
  }

  const errors = validateContactForm(values);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    await sendContactEmail(values);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "SMTP configuration is missing"
        ? "Отправка email ещё не настроена. Добавьте SMTP-переменные окружения."
        : "Не удалось отправить заявку. Попробуйте написать в Telegram или WhatsApp.";

    return NextResponse.json({ error: message }, { status: 503 });
  }
}
