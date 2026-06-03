# LendWise

AI-powered lending decision tool for Pakistan — help friends and family loan requests with clarity and confidence.

## Features (MVP)

- Single-page form: About the Borrower, Loan Details, Behavioral Signals
- Dark UI with gold accents (matches design mockups)
- AI assessment via Grok (Groq + Llama, verdict, trust score, pros/cons, practical advice)
- Optional Islamic finance perspective
- Mobile responsive, animated results, reset for another analysis

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment (`.env` only)

Project root mein sirf **`.env`** use karo — `.env.local` ya `.env.example` ki zaroorat nahi. File git mein commit nahi hoti (`.gitignore`).

```bash
# Groq — https://console.groq.com/keys
GROK_API_KEY=gsk_...
# GROK_MODEL=llama-3.3-70b-versatile

# Production URL (sitemap / robots)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# AdSense slots (optional — AdSense dashboard se)
NEXT_PUBLIC_ADSENSE_SLOT_FORM=
NEXT_PUBLIC_ADSENSE_SLOT_FORM_BOTTOM=
NEXT_PUBLIC_ADSENSE_SLOT_RESULT=
```

`GROK_API_KEY` ke bina app demo assessment use karti hai. AdSense script `layout.tsx` se load hoti hai; khali slot IDs par ad placeholders hide rehte hain. `public/ads.txt` verification ke liye hai.

## Deploy

[Vercel](https://vercel.com) par wahi variable names set karo (UI env vars = local `.env` keys). Redeploy ke baad production par apply honge.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Grok via Groq API (`groq-sdk` + `GROK_API_KEY`)
