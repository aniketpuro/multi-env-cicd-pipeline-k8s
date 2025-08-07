const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("🚀 Welcome to Aniket's Feedback API!");
});

app.post('/feedback', (req, res) => {
  const feedback = req.body;
  const data = JSON.parse(fs.readFileSync('feedback.json', 'utf8'));
  data.push(feedback);
  fs.writeFileSync('feedback.json', JSON.stringify(data, null, 2));
  res.status(201).send({ message: 'Feedback received 🙌' });
});

app.get('/feedbacks', (req, res) => {
  const data = JSON.parse(fs.readFileSync('feedback.json', 'utf8'));
  res.send(data);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

