import { site } from "@/data/site";

import { ContactForm } from "./ContactForm";
import { SectionLabel } from "./SectionLabel";
import { TextReveal } from "./TextReveal";

export const CONTACT_LINK_CLASS =
  "inline-flex min-h-10 items-center border border-line px-4 text-xs uppercase tracking-[0.16em] text-muted transition-[border-color,color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-bronze/60 hover:bg-bronze/[0.06] hover:text-champagne focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze active:translate-y-0";

type ContactSectionProps = {
  titleAs?: "h1" | "h2";
};

export function ContactSection({ titleAs = "h2" }: ContactSectionProps) {
  const Title = titleAs;

  return (
    <section id="contact" className="section-space border-t border-line bg-charcoal">
      <div className="page-shell">
        <SectionLabel index="08">Контакты</SectionLabel>
        <div className="mt-10 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <TextReveal>
              <Title className="display-title max-w-xl">
                Обсудим визуализацию вашего пространства
              </Title>
              <p className="mt-7 max-w-lg leading-7 text-muted">
                Расскажите о проекте, прикрепите ссылку на материалы или напишите
                в удобный мессенджер. Если проект пока на уровне идеи — этого
                достаточно, чтобы начать диалог.
              </p>
            </TextReveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={site.telegram} className={CONTACT_LINK_CLASS}>
                Telegram
              </a>
              <a href={site.whatsapp} className={CONTACT_LINK_CLASS}>
                WhatsApp
              </a>
              <a href={`mailto:${site.email}`} className={CONTACT_LINK_CLASS}>
                Email
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
