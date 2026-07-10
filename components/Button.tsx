import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "text";
};

type ButtonProps =
  | (SharedProps & { href: string; type?: never })
  | (SharedProps &
      ButtonHTMLAttributes<HTMLButtonElement> & { href?: never });

const styles = {
  primary:
    "border-bronze bg-bronze text-black hover:bg-champagne hover:border-champagne",
  secondary:
    "border-line bg-transparent text-ivory hover:border-ivory/40 hover:bg-ivory/[0.04]",
  text: "border-transparent px-0 text-ivory hover:text-champagne",
};

export const BUTTON_BASE_CLASS =
  "button inline-flex min-h-12 items-center justify-center gap-3 border px-6 text-center text-[0.69rem] font-semibold uppercase tracking-[0.18em] transition-[transform,border-color,background-color,color,opacity] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne disabled:pointer-events-none disabled:opacity-55";

export function Button({
  children,
  className,
  variant = "primary",
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    BUTTON_BASE_CLASS,
    styles[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} data-cursor="cta">
        {children}
        <span aria-hidden="true">↗</span>
      </Link>
    );
  }

  return (
    <button className={classes} data-cursor="cta" {...props}>
      {children}
    </button>
  );
}
