import request from 'supertest';
import app from '../routes.js';

describe('Scrape Route', () => {
  it('should scrape data from a given URL', async () => {
    const response = await request(app)
      .post('/scrape')
      .send({ url: 'http://example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data'); // Adjust based on actual response structure
  });

  it('should return an error for invalid URL', async () => {
    const response = await request(app)
      .post('/scrape')
      .send({ url: 'invalid-url' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Error scraping URL');
  });
});
