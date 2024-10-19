import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// POST /scrape
router.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch('http://localhost:3002/v1/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error scraping URL', error: error.message });
  }
});

export default router;
