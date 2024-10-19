import express from 'express';
import dotenv from 'dotenv';
import scrapeRoutes from './routes/scrape.js';
import proposalsRoutes from './routes/proposals.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the scrape routes
app.use('/', scrapeRoutes);

// Use the proposals routes
app.use('/', proposalsRoutes);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

export default app;
