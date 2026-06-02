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

### Grok AI setup (optional)

Copy `.env.example` to `.env.local` (or use `.env`) and add your [Groq](https://console.groq.com/keys) key:

```bash
GROK_API_KEY=gsk_...
```

Optional model override:

```bash
GROK_MODEL=llama-3.3-70b-versatile
```

Without `GROK_API_KEY`, the app uses a built-in demo assessment so you can test the UI.

## Deploy

Deploy to [Vercel](https://vercel.com) and set `GROK_API_KEY` in project environment variables.

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- Grok via Groq API (`groq-sdk` + `GROK_API_KEY`)
