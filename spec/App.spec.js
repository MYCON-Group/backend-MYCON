process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('/api', () => {
  describe('/event', () => {
    it('GET /event', () => {
      return request
        .get('/api/event')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('events');
          expect(res.body.events.length).to.equal(1);
          expect(res.body.events[0]).to.be.an('object');
        });
    });
    it('GET /event/:event_id', () => {
      return request
        .get('/api/event/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
    });
    it('POST /event', () => {
      const event = {
        "events_name:": "birthday",
        "events_img": "img_url_here",
        "events_start": "1st Jan 2019",
        "events_end": "1st Feb 2019",
        "events_description": "a birthday party",
        "events_location": "party central"
      }
      return request
        .post('/api/event')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
      });
  });
});