console.log('Server Running');
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3008;

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//default
app.get('/', async (req, res) => {
  res.send('default - please use correct url params ')
});

// Route to handle survey requests
app.get('/survey', async (req, res) => {
  console.log('/survey url');
  
  try {
    // Get parameters from the request query
    const { studyId, testMode, respondentId, serverId } = req.query;

    // Get the ServerURL based on the serverId from configuration file
    const serverConfig = {
        server: 'https://online-stg.ipsosinteractive.com/',
    };
    const serverURL = serverConfig[serverId];

    // Construct the URL for the survey
    const queryParams = new URLSearchParams({
        'ID': respondentId,
        'i.project': studyId,
        'i.test': testMode ? 1 : 0
    });
    const url = `${serverURL}?${queryParams.toString()}`;

    // Fetch content from the constructed URL
    const response = await fetch(url);
    const html = await response.text();

    // Send the fetched content as the response
    res.send(html);
  } catch (error) {
    console.error('Error fetching external content:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
