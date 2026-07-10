import { describe, expect, it } from "vitest";

import {
  CONTACT_FIELD_CLASS,
  CONTACT_FORM_CLASS,
  CONTACT_MATERIALS_UPLOAD_LABEL,
  CONTACT_MATERIALS_UPLOAD_ICON_CLASS,
} from "@/components/ContactForm";
import { CONTACT_LINK_CLASS } from "@/components/ContactSection";
import { validateContactForm } from "@/lib/contact";

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
    expect(CONTACT_FIELD_CLASS).toContain("focus:border-bronze");
    expect(CONTACT_FIELD_CLASS).toContain("focus:bg-ivory/[0.025]");
  });

  it("uses refined contact channel link states", () => {
    expect(CONTACT_LINK_CLASS).toContain("border-line");
    expect(CONTACT_LINK_CLASS).toContain("hover:border-bronze/60");
    expect(CONTACT_LINK_CLASS).toContain("hover:text-champagne");
  });
});
