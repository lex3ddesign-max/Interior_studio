import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { PageTransition } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";
import { site } from "@/data/site";
import { buildSeoMetadata } from "@/lib/seo";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "@/lib/structured-data";

import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildSeoMetadata({
    title: "AVENOR — премиальная 3D-визуализация",
    description: site.heroSubtitle,
  }),
  metadataBase: new URL(site.url),
  title: {
    default: "AVENOR — премиальная 3D-визуализация",
    template: "%s — AVENOR",
  },
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <JsonLd data={[buildOrganizationJsonLd(), buildWebsiteJsonLd()]} />
        <MotionProvider>
          <Preloader />
          <CustomCursor />
          <Header />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
