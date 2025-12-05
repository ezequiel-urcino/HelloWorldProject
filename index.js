// index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static assets (css, js, images) from /views/public (adjust if needed)
app.use('/static', express.static(path.join(__dirname, 'views', 'public')));

// Route: GET /test -> static test page (used by Android GET button)
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'test.html'));
});

// Route: GET /madlib -> the interactive page (for manual browser testing)
app.get('/madlib', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'madlib.html'));
});

// Route: POST /play -> expects JSON with words, returns completed story JSON
app.post('/play', (req, res) => {
  try {
    const { noun = '', verb = '', adjective = '', place = '', animal = '' } = req.body;

    // Sanitize/validate minimally
    const safe = s => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const story = `On Thanksgiving, my ${safe(adjective)} ${safe(noun)} decided to ${safe(verb)} at the ${safe(place)}. Everyone laughed, especially when a ${safe(animal)} showed up. It was a memorable day!`;

    // Return JSON
    return res.json({ ok: true, story });
  } catch (err) {
    console.error('POST /play error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// optional root redirect
app.get('/', (req, res) => {
  res.redirect('/madlib');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

