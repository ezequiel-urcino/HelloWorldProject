const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Optional: serve static assets from /public
app.use('/static', express.static(path.join(__dirname, 'public')));

// GET /test → static test page
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'test.html'));
});

// GET /madlib → browser interactive page
app.get('/madlib', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'madlib.html'));
});

// POST /play → generate Mad Libs story
app.post('/play', (req, res) => {
  try {
    const { noun = '', verb = '', adjective = '', place = '', animal = '' } = req.body;
    const safe = s => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const story = `On Thanksgiving, my ${safe(adjective)} ${safe(noun)} decided to ${safe(verb)} at the ${safe(place)}. Everyone laughed, especially when a ${safe(animal)} showed up. It was a memorable day!`;

    return res.json({ ok: true, story });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Root redirect to /madlib
app.get('/', (req, res) => {
  res.redirect('/madlib');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

