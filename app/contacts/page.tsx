import type { Metadata } from "next";

import { ContactSection } from "@/components/ContactSection";
import { caseImages } from "@/data/media";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Контакты",
  description:
    "Обсудить 3D-визуализацию с AVENOR: отправьте материалы, референсы или короткое описание проекта для спокойной оценки задачи.",
  path: "/contacts",
  image: caseImages.interiorWarm,
});

export default function ContactsPage() {
  return (
    <div className="pt-8">
      <ContactSection titleAs="h1" />
    </div>
  );
}
