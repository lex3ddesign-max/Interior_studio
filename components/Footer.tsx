import Link from "next/link";

import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const primaryLinks = navigation.filter((item) =>
    ["/cases", "/about", "/contacts"].includes(item.href),
  );
  const offerLinks = navigation.filter((item) =>
    ["/services", "/pricing"].includes(item.href),
  );

  return (
    <footer className="border-t border-line bg-black">
      <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_0.75fr_0.75fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-dark">
            {site.descriptor}
          </p>
          <p className="mt-8 max-w-xs text-xs uppercase leading-6 tracking-[0.16em] text-muted-dark">
            Фотореалистичная 3D-визуализация для интерьеров, архитектуры и коммерческих пространств.
          </p>
        </div>
        <div>
          <p className="footer-label">Навигация</p>
          <ul className="mt-5 grid gap-3 text-sm text-muted">
            {primaryLinks.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-ivory" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">Направления</p>
          <ul className="mt-5 grid gap-3 text-sm text-muted">
            {offerLinks.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-ivory" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:justify-self-end lg:text-right">
          <p className="footer-label">Связаться</p>
          <a
            className="mt-5 block text-lg text-ivory hover:text-champagne"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-dark lg:ml-auto">
            Можно написать в мессенджер, отправить ссылку на материалы или коротко описать задачу.
          </p>
          <SocialLinks className="mt-5 lg:justify-end" />
        </div>
      </div>
      <div className="page-shell flex flex-col gap-3 border-t border-line py-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted-dark sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} AVENOR</span>
        <span>Visual production studio</span>
      </div>
    </footer>
  );
}
