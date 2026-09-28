# Zami & Adriel — Wedding Website

A wedding website for our guests: event details, our story, photo gallery, travel/location info, a live registry, and an RSVP form that emails responses straight to our inbox.

**Live site:** https://zamiandadriel.com

## Features

- **Intro animation & hero** — animated envelope opening into the landing section, with a live countdown to the big day
- **Our Story & Photo Gallery** — engagement photos and the story of how we met
- **Event Details & Location** — ceremony/reception times, venue info, and travel details
- **Registry** — `GET /api/registry` pulls items from our Amazon wedding registry (parsing `__NEXT_DATA__` / JSON-LD), cached for 30 minutes with Next.js revalidation
- **RSVP** — `POST /api/rsvp` validates the submission (attendance, guest count, meal choice, dietary needs, song requests) and sends it by email via Nodemailer/SMTP
- Responsive layout with light/dark theming

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Three.js · React Hook Form + Zod · Nodemailer · Vercel Analytics

## Project Structure

```
app/
  page.tsx               # Single-page layout composing all sections
  api/rsvp/route.ts      # RSVP validation + email delivery
  api/registry/route.ts  # Amazon registry scraper/parser
components/
  wedding/               # Site sections (hero, our-story, rsvp-form, registry-section, ...)
  ui/                    # shadcn/ui primitives
public/                  # Photos, video, and icons
```

## Running Locally

```bash
npm install
cp .env.example .env.local   # fill in SMTP credentials
npm run dev
```

Then open http://localhost:3000.

### Environment Variables

| Variable | Purpose |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | SMTP server settings (e.g. Gmail) |
| `SMTP_USER`, `SMTP_PASS` | SMTP login (use a Gmail app password) |
| `SMTP_FROM` | "From" name/address on RSVP emails |
| `RSVP_TO_EMAIL` | Inbox that receives new RSVPs |

## Deployment

Deployed on Vercel. Add the environment variables above in the Vercel project settings.
