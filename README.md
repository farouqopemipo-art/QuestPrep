# QuestPrep — AI Interview Coach

> Practice interviews. Get scored. Know exactly what to fix.
> Powered by Claude AI.

---

## Project Structure

```
questprep/
├── public/
│   └── index.html       ← Full frontend (landing page + app)
├── server.js            ← Express backend (secure API proxy)
├── package.json         ← Dependencies
├── .env.example         ← Environment variable template
├── .env                 ← YOUR keys go here (never commit this)
└── README.md
```

---

## Setup — Step by Step

### 1. Install Node.js
Download from https://nodejs.org (choose the LTS version)

### 2. Get your Claude API Key
- Go to https://console.anthropic.com
- Sign in and click "API Keys"
- Create a new key and copy it

### 3. Set up your environment
In the project folder, create a `.env` file:
```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your real API key:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000
```

### 4. Install dependencies
Open your terminal in the project folder and run:
```bash
npm install
```

### 5. Start the server
```bash
npm start
```

You should see:
```
  ╔═══════════════════════════════════╗
  ║   QuestPrep is running             ║
  ║   http://localhost:3000            ║
  ╚═══════════════════════════════════╝

  ✓  Claude API key loaded successfully
```

### 6. Open the app
Go to http://localhost:3000 in your browser.

---

## How it Works

```
Browser  →  /api/claude  →  server.js  →  Claude API
                ↑ API key stays here, never exposed to browser
```

Your API key lives only in `.env` on your machine.
The browser never sees it — it only talks to your local server.

---

## Features

| Feature | Description |
|---------|-------------|
| Landing Page | Live demo with Claude scoring your answer in real-time |
| Setup Page | Enter job role, company, job description, experience level |
| Interview | Question-by-question with progress bar, MC + open-ended |
| Results | Score ring, per-question review, best/worst scores |
| SWOT Analysis | AI-generated strengths, weaknesses, opportunities, threats + 30-day action plan |

---

## Troubleshooting

**"ANTHROPIC_API_KEY is not set"**
→ Make sure your `.env` file exists and has the correct key. Restart the server after editing it.

**"Cannot find module"**
→ Run `npm install` again.

**Page loads but Claude doesn't respond**
→ Check the terminal for error messages. Your API key may be invalid.

**Port already in use**
→ Change `PORT=3001` in your `.env` file.

---

## For Hackathon Demo

1. Run `npm start` before presenting
2. Open http://localhost:3000 on the presentation screen
3. Demo flow: Landing → Try It Now → Fill Setup → Start Interview → Answer live → Show Results → Show SWOT

> The live scoring on the landing page is your wow moment — answer a question in front of the judges and let Claude score it instantly.
