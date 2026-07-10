import type { Metadata } from "next";

import { ContactSection } from "@/components/ContactSection";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Контакты",
  description:
    "Обсудить 3D-визуализацию интерьера, экстерьера или коммерческого пространства с AVENOR.",
  path: "/contacts",
  image: "/images/cases/interior-warm.jpg",
});

export default function ContactsPage() {
  return (
    <div className="pt-8">
      <ContactSection titleAs="h1" />
    </div>
  );
}
