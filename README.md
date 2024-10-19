# Gov Military Proposal Generator

## Overview

The Gov Military Proposal Generator is a comprehensive tool designed to automate the creation of government and military proposals. This repository encompasses web scraping, data preprocessing, AI modeling, and a frontend/backend interface to streamline the proposal generation process.

## Directory Structure

- **scraper/**: Handles data scraping from various government and military sources.
- **data/**: Stores raw, processed, and log data.
- **preprocessing/**: Cleans and structures the scraped data.
- **ai_model/**: Contains AI models and training scripts.
- **frontend/**: User interface for interacting with the proposal generator.
- **backend/**: Server-side application managing requests and data processing.
- **templates/**: Proposal templates in DOCX and PDF formats.
- **docs/**: Documentation including architecture, API details, and user guides.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js and npm
- Virtual environment tool (e.g., venv)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-directory>
```

2. **Install backend dependencies**

Navigate to the backend directory and install the required npm packages.

```bash
cd backend
npm install
```

3. **Set environment variables**

Create a `.env` file in the backend directory and add your OpenAI API key.

```
OPENAI_API_KEY=your_openai_api_key
```

4. **Start the Redis server**

Ensure that your Redis server is running. You can start a local Redis server using:

```bash
redis-server
```

5. **Run the backend server**

Start the server to handle requests to the routes defined in `routes.js`.

```bash
npm run dev
```

This command will start the backend server using the `dev` script defined in the `package.json` file, which runs `node backend/routes.js`.

# Web Application Using Firecrawl for Proposal Scraping and Generation

This web application leverages Firecrawl to scrape proposals from various sources and then builds structured proposals in response to the scraped documents. By utilizing Firecrawl's advanced scraping and data extraction capabilities, the application ensures that the generated proposals are based on clean and structured data.

## What is Firecrawl?

Firecrawl is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data. It crawls all accessible subpages and provides clean data for each, without requiring a sitemap.

## Hosted vs. Self-Hosted

Firecrawl can be used as a hosted service or self-hosted. Here's how they differ:

- **Hosted Service**: Firecrawl is available as a cloud service, where you can make API calls to `https://api.firecrawl.dev`.
- **Self-Hosted**: You can run Firecrawl on your own infrastructure, allowing you to make API calls to your local server.

## Application Workflow

1. **Scrape Proposals**: The application uses Firecrawl to scrape proposals from specified URLs.
2. **Structured Generation**: Based on the scraped data, the application generates structured proposals, ensuring that the output is organized and relevant.

## Getting Started

### Hosted Service Example

To use the hosted version of Firecrawl, you need to sign up and get an API key. Here's an example API call:

```bash
curl -X POST https://api.firecrawl.dev/v1/crawl \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer fc-YOUR_API_KEY' \
    -d '{
      "url": "https://docs.firecrawl.dev",
      "limit": 100,
      "scrapeOptions": {
        "formats": ["markdown", "html"]
      }
    }'
```

### Self-Hosted Example

For self-hosting, you can run Firecrawl on your local server. Here's an example API call for a self-hosted setup:

```bash
curl -X POST http://localhost:3002/v1/crawl \
    -H 'Content-Type: application/json' \
    -d '{
      "url": "https://mendable.ai"
    }'
```

## Features

- **LLM-ready formats**: Markdown, structured data, screenshots, HTML, links, metadata.
- **Advanced Capabilities**: Proxies, anti-bot mechanisms, dynamic content handling, and more.
- **Customizability**: Exclude tags, crawl behind auth walls, set max crawl depth, etc.
- **Media Parsing**: PDFs, DOCX, images.
- **Reliability**: Designed to get the data you need, no matter how challenging.

## Documentation

For more detailed information on using Firecrawl, visit the [official documentation](https://docs.firecrawl.dev).
