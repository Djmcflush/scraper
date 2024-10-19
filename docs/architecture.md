# Architecture Overview

## Components

- **Scraper**: Extracts data from government and military websites.
- **Preprocessing**: Cleans and structures the scraped data.
- **Backend**: Exposes APIs for proposal generation.
- **Frontend**: User interface for interacting with the system.

## Data Flow

1. **Scraping**: Data is collected and stored in `data/raw/`.
2. **Preprocessing**: Raw data is cleaned and structured into `data/processed/`.
3. **Model Training**: The AI model is trained using the processed data.
4. **Proposal Generation**: Users input seed text via the frontend, which interacts with the backend to generate proposals using the trained AI model.

## Technologies Used

- **Python**: Backend, scraping, preprocessing, AI modeling.
- **Scrapy**: Web scraping framework.
- **Flask**: Backend API.
- **React.js**: Frontend development.
- **Bootstrap**: Styling and responsive design.