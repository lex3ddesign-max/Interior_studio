import { site } from "@/data/site";

const socialLinks = [
  { label: "Telegram", href: site.telegram, icon: "telegram" },
  { label: "WhatsApp", href: site.whatsapp, icon: "whatsapp" },
  { label: "VK", href: site.vk, icon: "vk" },
] as const;

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className="inline-flex h-10 w-10 items-center justify-center border border-line text-muted transition-[border-color,color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-bronze/60 hover:bg-bronze/[0.06] hover:text-champagne focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          target="_blank"
          rel="noreferrer"
        >
          <SocialIcon name={item.icon} />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  if (name === "telegram") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.5 4.5 3.8 11.1c-.9.36-.86 1.67.06 1.96l4.08 1.28 1.58 4.92c.28.86 1.39 1.08 1.97.39l2.25-2.65 4.24 3.1c.78.57 1.9.13 2.08-.82l2.06-13.3c.16-1.02-.67-1.86-1.62-1.48Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="m8 14.2 7.8-5.1-5.8 7.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.2 19.1 6.1 16A7.6 7.6 0 1 1 9 18.6l-3.8.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4l.8 1.8c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.3 0 .6.4.7 1.2 1.7 2.4 2.2.3.1.5.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .8-.7 1.7-1.5 1.8-1.3.2-3.9-.7-5.8-2.6-1.8-1.8-2.8-4.2-2.3-5.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7.2c.1 5.7 3.1 9.2 8.6 9.2h.3v-3.3c2 .2 3.5 1.7 4.1 3.3h2.9c-.8-2.4-2.6-4-3.8-4.6 1.2-.8 2.8-2.6 3.2-4.6h-2.6c-.6 1.7-2.2 3.5-3.8 3.7V7.2h-2.6v6.5C8.7 13.3 6.7 11.3 6.6 7.2H4Z"
        fill="currentColor"
      />
    </svg>
  );
}
