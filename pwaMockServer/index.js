const express = require('express');
const app = express();
const port = 5001;

// Enable CORS for all routes (for testing purposes)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Sample questions data
const questions = [
    { id: 1, label: "This is a test question", isFinal: false },
    { id: 2, label: "How do you feel today?", isFinal: false },
    { id: 3, label: "Did you smoke today?", isFinal: false },
    { id: 4, label: "Did you exercise today?", isFinal: true }
  ];
  

// API endpoint to get all questions
app.get('/api/questions', (req, res) => {
  res.json({ questions });
});

// API endpoint to get a specific question by ID
app.get('/api/questions/:id', (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = questions.find(q => q.id === questionId);

  if (question) {
    res.json({ question });
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/api/questions/`);
});
