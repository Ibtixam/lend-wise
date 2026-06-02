# LendWise

AI-powered lending decision tool for Pakistan — help friends and family loan requests with clarity and confidence.

## Features (MVP)

- Single-page form: About the Borrower, Loan Details, Behavioral Signals
- Dark UI with gold accents (matches design mockups)
- AI assessment via Groq (verdict, trust score, pros/cons, practical advice)
- Optional Islamic finance perspective
- Mobile responsive, animated results, reset for another analysis

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### AI setup (optional)

Copy `.env.example` to `.env.local` and add your [Groq](https://console.groq.com/keys) API key:

```bash
GROW_API_KEY=gsk_...
```

Optional model override: `GROW_MODEL=llama-3.3-70b-versatile`

Without a key, the app still works using a built-in demo assessment so you can test the UI.

## Deploy

Deploy to [Vercel](https://vercel.com) and set `GROW_API_KEY` in project environment variables.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Groq API (Llama via `groq-sdk`)
