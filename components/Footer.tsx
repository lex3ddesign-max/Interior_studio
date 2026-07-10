import Link from "next/link";

import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted-dark">
            {site.descriptor}
          </p>
        </div>
        <div>
          <p className="footer-label">Навигация</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-ivory" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-label">Связаться</p>
          <a
            className="mt-5 block text-lg text-ivory hover:text-champagne"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          <SocialLinks className="mt-5" />
        </div>
      </div>
      <div className="page-shell flex flex-col gap-3 border-t border-line py-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} AVENOR</span>
        <span>Visual production studio</span>
      </div>
    </footer>
  );
}
