"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navigation } from "@/data/navigation";
import { resolveMenuState } from "@/lib/interactions";

import { Button } from "./Button";
import { Logo } from "./Logo";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen((current) => resolveMenuState(current, "escape"));
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-black/85 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/contacts" variant="secondary" className="min-h-10 px-5">
            Обсудить проект
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() =>
            setIsOpen((current) => resolveMenuState(current, "toggle"))
          }
          className="mobile-menu-trigger flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
        >
          <span className="h-px w-5 bg-ivory" />
          <span className="h-px w-5 bg-ivory" />
        </button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Мобильная навигация"
          className="mobile-navigation fixed inset-x-0 top-20 bottom-0 border-t border-line bg-charcoal/98 px-4 py-8 backdrop-blur-xl sm:px-8 lg:hidden"
        >
          <ul className="divide-y divide-line border-y border-line">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link
                  className="flex min-h-16 items-center justify-between text-lg text-ivory"
                  href={item.href}
                  onClick={() =>
                    setIsOpen((current) =>
                      resolveMenuState(current, "navigate"),
                    )
                  }
                >
                  {item.label}
                  <span className="text-xs text-muted-dark">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/contacts" className="mt-8 w-full">
            Обсудить проект
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
