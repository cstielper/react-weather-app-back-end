const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const dsApiKey = process.env.DS_API_KEY;

app.use(cors());

app.get('/', (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const units = req.query.units;

  if (lat && lng && units) {
    res.setHeader('Content-Type', 'application/json');
    fetch(
      `https://api.darksky.net/forecast/${dsApiKey}/${lat},${lng}?units=${units}`
    )
      .then(response => response.json())
      .then(data => res.end(JSON.stringify(data)))
      .catch(err => console.error(err));
  } else {
    res.status(400).json({ error: "We're sorry, but there was a problem." });
  }
});

app.listen(process.env.PORT || 5000);
