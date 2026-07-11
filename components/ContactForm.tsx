"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact";

import { Button } from "./Button";

const initialValues: ContactFormValues = {
  name: "",
  contact: "",
  message: "",
  materials: "",
};

export const CONTACT_MATERIALS_UPLOAD_LABEL = "Загрузить материалы";
export const CONTACT_MATERIALS_UPLOAD_ICON_CLASS =
  "absolute right-0 bottom-3 inline-flex h-9 w-9 items-center justify-center text-champagne transition-colors duration-300 hover:text-ivory focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze";
export const CONTACT_FORM_CLASS =
  "relative grid gap-6 rounded-[2rem] border border-line bg-black/20 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-8 lg:p-10";
export const CONTACT_FIELD_LABEL_CLASS =
  "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors duration-300 group-focus-within:text-champagne";
export const CONTACT_FIELD_CLASS =
  "contact-field w-full border-0 border-b border-line bg-transparent py-3 text-base text-ivory outline-none transition-[border-color,background-color,padding] duration-300 placeholder:text-muted-dark focus:border-b-bronze focus:bg-transparent focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:outline-0 focus-visible:ring-0";
export const CONTACT_SUBMIT_BUTTON_CLASS = "w-fit min-h-10 px-5 self-start";

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");
  const materialsFileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setServerMessage(
          payload.error ??
            "Не удалось отправить заявку. Попробуйте написать в Telegram или WhatsApp.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setServerMessage(
        "Не удалось отправить заявку. Попробуйте написать в Telegram или WhatsApp.",
      );
      setStatus("error");
    }
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleMaterialsFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    updateField("materials", file.name);
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[2rem] border border-bronze/50 bg-black/20 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        role="status"
      >
        <p className="text-2xl text-ivory">Спасибо. Заявка принята.</p>
        <p className="mt-3 text-muted">
          Мы получили материалы и вернёмся с ответом после спокойной оценки задачи.
        </p>
        <button
          type="button"
          className="mt-8 text-xs uppercase tracking-[0.16em] text-champagne"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={CONTACT_FORM_CLASS}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-bronze/55 to-transparent"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Имя"
          name="name"
          value={values.name}
          error={errors.name}
          onChange={(value) => updateField("name", value)}
        />
        <Field
          label="Email, телефон или мессенджер"
          name="contact"
          value={values.contact}
          error={errors.contact}
          onChange={(value) => updateField("contact", value)}
        />
      </div>
      <Field
        label="Расскажите о проекте"
        name="message"
        value={values.message}
        error={errors.message}
        multiline
        onChange={(value) => updateField("message", value)}
      />
      <Field
        label="Ссылка на материалы"
        name="materials"
        value={values.materials}
        error={errors.materials}
        uploadButton={
          <>
            <input
              ref={materialsFileRef}
              type="file"
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              onChange={handleMaterialsFileChange}
            />
            <button
              type="button"
              className={CONTACT_MATERIALS_UPLOAD_ICON_CLASS}
              aria-label={CONTACT_MATERIALS_UPLOAD_LABEL}
              onClick={() => materialsFileRef.current?.click()}
            >
              <UploadIcon />
            </button>
          </>
        }
        onChange={(value) => updateField("materials", value)}
      />
      {status === "error" ? (
        <p className="text-sm text-champagne" role="alert">
          {serverMessage || "Проверьте обязательные поля."}
        </p>
      ) : null}
      <Button
        type="submit"
        className={CONTACT_SUBMIT_BUTTON_CLASS}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Отправляем…" : "Отправить проект"}
      </Button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  multiline?: boolean;
  uploadButton?: ReactNode;
  onChange: (value: string) => void;
};

function Field({
  label,
  name,
  value,
  error,
  multiline,
  uploadButton,
  onChange,
}: FieldProps) {
  const classes =
    CONTACT_FIELD_CLASS;
  const fieldId = `contact-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className="group block">
      <label
        htmlFor={fieldId}
        className={CONTACT_FIELD_LABEL_CLASS}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={`${classes} px-0`}
        />
      ) : (
        <span className="relative block">
          <input
            id={fieldId}
            name={name}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => onChange(event.target.value)}
            className={`${classes} ${uploadButton ? "pl-0 pr-12" : "px-0"}`}
          />
          {uploadButton}
        </span>
      )}
      {error ? (
        <span id={errorId} className="mt-2 block text-xs text-champagne">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" />
    </svg>
  );
}
