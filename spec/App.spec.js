process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const app = require('../App');
const request = require('supertest')(app);

describe('/api', () => {
  describe('/event', () => {
    it('GET /event', () => {
      return request
        .get('/api/event')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('events');
          expect(res.body.houses.length).to.equal(1);
          expect(res.body.houses[0]).to.be.an('object');
        });
    });
  });
});