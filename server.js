require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ── Health check ─────────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'QuestPrep server is running' });
});

/* ── Claude API proxy ─────────────────────────────────────── */
app.post('/api/claude', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set in your .env file. Please add it and restart the server.'
    });
  }

  const { messages, system, max_tokens } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array is required.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: max_tokens || 1200,
        system: system || '',
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Claude API error:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Claude API request failed.'
      });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

/* ── Catch-all: serve frontend ────────────────────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════╗');
  console.log('  ║   QuestPrep is running             ║');
  console.log(`  ║   http://localhost:${PORT}           ║`);
  console.log('  ╚═══════════════════════════════════╝');
  console.log('');
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('  ⚠  WARNING: ANTHROPIC_API_KEY is not set in .env');
    console.warn('  ⚠  The app will not work until you add your key.\n');
  } else {
    console.log('  ✓  Claude API key loaded successfully\n');
  }
});
