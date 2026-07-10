export type ContactFormValues = {
  name: string;
  contact: string;
  message: string;
  materials: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Укажите имя";
  }

  if (!values.contact.trim()) {
    errors.contact = "Оставьте email, телефон или ник в мессенджере";
  }

  if (!values.message.trim()) {
    errors.message = "Коротко расскажите о проекте";
  }

  return errors;
}

