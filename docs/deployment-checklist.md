# AVENOR deployment checklist

## Environment

Set these values before a production deploy:

- `NEXT_PUBLIC_SITE_URL` — final public URL without a trailing slash.
- `NEXT_PUBLIC_CONTACT_EMAIL` — real project intake email.
- `NEXT_PUBLIC_CONTACT_TELEGRAM` — real Telegram contact URL.
- `NEXT_PUBLIC_CONTACT_WHATSAPP` — real WhatsApp contact URL.

The project has safe prototype fallbacks in `.env.example`, but they should be replaced before a public client launch.

## Preflight

Run:

```bash
npm test -- --run
npm run lint
npm run build
```

Then verify:

- `/robots.txt` returns `200`.
- `/sitemap.xml` returns `200` and contains the production domain.
- Home, cases, services, contacts and service detail pages each have one `h1`.
- Contact form shows the demo success state.
- Lighthouse remains green on the production URL.

## Current deployment note

This folder is not currently a git repository. A Sites production deployment requires a saved source state / commit SHA, so initialize or connect git before saving and deploying a Sites version.
