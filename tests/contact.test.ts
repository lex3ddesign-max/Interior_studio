import { describe, expect, it } from "vitest";

import {
  CONTACT_SUBMIT_BUTTON_CLASS,
  CONTACT_FIELD_CLASS,
  CONTACT_FIELD_LABEL_CLASS,
  CONTACT_FORM_CLASS,
  CONTACT_MATERIALS_UPLOAD_LABEL,
  CONTACT_MATERIALS_UPLOAD_ICON_CLASS,
} from "@/components/ContactForm";
import { CONTACT_LINK_CLASS } from "@/components/ContactSection";
import { validateContactForm } from "@/lib/contact";
import {
  CONTACT_FORM_RECIPIENT,
  buildContactEmail,
  getContactEmailConfig,
} from "@/lib/contact-mail";

describe("validateContactForm", () => {
  it("requires a name", () => {
    expect(
      validateContactForm({
        name: "",
        contact: "hello@example.com",
        message: "Нужна визуализация интерьера.",
        materials: "",
      }).name,
    ).toBeDefined();
  });

  it("requires a contact method", () => {
    expect(
      validateContactForm({
        name: "Анна",
        contact: "",
        message: "Нужна визуализация интерьера.",
        materials: "",
      }).contact,
    ).toBeDefined();
  });

  it("accepts a complete request", () => {
    expect(
      validateContactForm({
        name: "Анна",
        contact: "@anna",
        message: "Нужна визуализация интерьера.",
        materials: "https://example.com/brief",
      }),
    ).toEqual({});
  });

  it("defines an upload affordance for the materials link field", () => {
    expect(CONTACT_MATERIALS_UPLOAD_LABEL).toBe("Загрузить материалы");
    expect(CONTACT_MATERIALS_UPLOAD_ICON_CLASS).toContain("absolute");
    expect(CONTACT_MATERIALS_UPLOAD_ICON_CLASS).toContain("right-0");
    expect(CONTACT_MATERIALS_UPLOAD_ICON_CLASS).toContain("text-champagne");
  });

  it("uses a quiet luxury panel and polished input focus states", () => {
    expect(CONTACT_FORM_CLASS).toContain("rounded-[2rem]");
    expect(CONTACT_FORM_CLASS).toContain("border-line");
    expect(CONTACT_FORM_CLASS).toContain("bg-black/20");
    expect(CONTACT_FIELD_LABEL_CLASS).toContain("text-muted");
    expect(CONTACT_FIELD_CLASS).toContain("contact-field");
    expect(CONTACT_FIELD_CLASS).toContain("focus:border-b-bronze");
    expect(CONTACT_FIELD_CLASS).toContain("focus:outline-none");
    expect(CONTACT_FIELD_CLASS).toContain("focus-visible:outline-none");
    expect(CONTACT_FIELD_CLASS).toContain("focus-visible:ring-0");
  });

  it("uses a compact submit button instead of a full-width heavy CTA", () => {
    expect(CONTACT_SUBMIT_BUTTON_CLASS).toContain("w-fit");
    expect(CONTACT_SUBMIT_BUTTON_CLASS).toContain("min-h-10");
    expect(CONTACT_SUBMIT_BUTTON_CLASS).toContain("px-5");
    expect(CONTACT_SUBMIT_BUTTON_CLASS).not.toContain("w-full");
  });

  it("uses refined contact channel link states", () => {
    expect(CONTACT_LINK_CLASS).toContain("border-line");
    expect(CONTACT_LINK_CLASS).toContain("hover:border-bronze/60");
    expect(CONTACT_LINK_CLASS).toContain("hover:text-champagne");
  });

  it("builds a plain text email request for the configured recipient", () => {
    expect(CONTACT_FORM_RECIPIENT).toBe("alex3ddesign@yandex.ru");
    const email = buildContactEmail({
      name: "Анна",
      contact: "@anna",
      message: "Нужна визуализация квартиры.",
      materials: "https://example.com/brief",
    });

    expect(email.to).toBe("alex3ddesign@yandex.ru");
    expect(email.subject).toContain("Новая заявка AVENOR");
    expect(email.text).toContain("Анна");
    expect(email.text).toContain("@anna");
    expect(email.text).toContain("https://example.com/brief");
  });

  it("keeps email transport credentials in environment variables", () => {
    expect(
      getContactEmailConfig({
        SMTP_HOST: "smtp.yandex.ru",
        SMTP_PORT: "465",
        SMTP_USER: "hello@example.com",
        SMTP_PASS: "secret",
      }),
    ).toMatchObject({
      host: "smtp.yandex.ru",
      port: 465,
      user: "hello@example.com",
      pass: "secret",
    });

    expect(() => getContactEmailConfig({})).toThrow(
      "SMTP configuration is missing",
    );
  });
});
