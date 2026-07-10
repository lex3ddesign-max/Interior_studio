import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="AVENOR — на главную"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="relative h-7 w-7 border border-ivory/60" aria-hidden="true">
        <span className="absolute -right-px -top-px h-3.5 w-3.5 border-b border-l border-bronze" />
      </span>
      <span className="text-[0.72rem] font-semibold tracking-[0.38em] text-ivory">
        AVENOR
      </span>
    </Link>
  );
}

