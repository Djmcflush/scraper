import request from 'supertest';
import app from '../routes.js';

describe('Proposals Routes', () => {
  it('should retrieve all proposals', async () => {
    const response = await request(app).get('/proposals');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should generate ideas for a proposal', async () => {
    const proposalId = 1; // Example proposal ID
    const response = await request(app)
      .post(`/proposals/${proposalId}/ideas`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
  });

  it('should generate a proposal', async () => {
    const proposalId = 1; // Example proposal ID
    const response = await request(app)
      .post(`/proposals/${proposalId}/generate`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('1. Project Planning and Requirements Gathering');
  });

  it('should return 404 for non-existent proposal', async () => {
    const proposalId = 999; // Non-existent proposal ID
    const response = await request(app)
      .post(`/proposals/${proposalId}/ideas`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Proposal not found');
  });
});
