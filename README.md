# 🌿 SAGE — Symptom Assessment & Guidance Engine

An AI-powered multilingual medical consultation app that helps users understand their symptoms, assess urgency, and find the right medical care.

**Live:** [sage-liart-phi.vercel.app](https://sage-liart-phi.vercel.app)

---

## What SAGE Does

SAGE guides users through a structured medical consultation using conversational AI. It collects symptom information step by step, asks intelligent follow-up questions, and provides a structured assessment including likely diagnosis, urgency level, red flags to watch for, and recommended next steps.

SAGE is a guidance tool only. It does not replace professional medical advice, diagnosis, or treatment.

---

## Features

- **8 languages** — English, Spanish, French, German, Portuguese, Russian, Chinese (Simplified), Japanese
- **Emergency triage** — screens for life-threatening conditions before starting the consultation
- **Interactive body diagram** — 48 tappable zones (front and back) for locating symptoms
- **Smart widgets** — yes/no, pain scale, duration picker, temperature, heart rate, and multi-select symptom lists
- **Conversation memory** — compresses older turns to maintain context without slowing down on mobile
- **Mobile-first design** — optimised for iPhone and Android browsers
- **Secure API relay** — Anthropic API key is server-side, never exposed to the client

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| UI | Custom CSS-in-JS, DM Sans font |
| AI Backend | Claude Sonnet 4.6 (Anthropic) |
| API Relay | Vercel Serverless Function |
| Hosting | Vercel |
| Source Control | GitHub |

---

## Project Structure

```
sage-app/
├── api/
│   └── chat.js          # Serverless API relay (keeps API key secure)
├── src/
│   ├── main.jsx         # React entry point
│   └── SAGE.jsx         # Main application (single-file architecture)
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## Consultation Flow

```
Language Selection
       ↓
Demographics (age, sex, ethnicity)
       ↓
Emergency Triage (5 categories)
       ↓
Body Diagram (symptom location)
       ↓
AI Consultation (multi-turn chat with widgets)
       ↓
Structured Assessment
```

---

## Deployment

SAGE is deployed on Vercel with automatic deployments triggered by pushes to the `main` branch on GitHub.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (set in Vercel dashboard) |

### To deploy your own instance

1. Fork this repository
2. Create a Vercel account at [vercel.com](https://vercel.com)
3. Import the repository in Vercel
4. Set `Root Directory` to `sage-app`
5. Add `ANTHROPIC_API_KEY` in Vercel Environment Variables
6. Deploy

---

## Supported Languages

| Language | Code |
|----------|------|
| English | `en` |
| Spanish | `es` |
| French | `fr` |
| German | `de` |
| Portuguese | `pt` |
| Russian | `ru` |
| Chinese (Simplified) | `zh` |
| Japanese | `ja` |

---

## Important Disclaimers

- SAGE is a guidance tool only and does not provide medical diagnoses
- In any emergency, call your local emergency services immediately
- No personal identifying information is collected or stored
- Consultation data is not retained after the session ends

---

## Roadmap

- [ ] Custom domain
- [ ] User feedback collection
- [ ] Usage analytics
- [ ] Native iOS app
- [ ] Native Android app
- [ ] Consultation history (optional user accounts)
- [ ] Additional languages (Arabic, Hindi)

---

## License

Private — all rights reserved. Not open for redistribution or commercial use without permission.

---

*Built with Claude Sonnet 4.6 · Deployed on Vercel · © 2025 SAGE*
