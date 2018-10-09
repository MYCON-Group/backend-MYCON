process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('/api', () => {
  describe('/events', () => {
    it('GET /events', () => {
      return request
        .get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('events');
          expect(res.body.events.length).to.equal(2);
          expect(res.body.events[0]).to.be.an('object');
        });
    });
    it('POST /events', () => {
      const event = {
        "events_name": "birthday",
        "events_img": "img_url_here",
        "events_start": "1st Jan 2019",
        "events_end": "1st Feb 2019",
        "events_description": "a birthday party",
        "events_location": "party central"
      }
      return request
        .post('/api/events')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
    });
  });
  describe('/events/:event_id', () => {
    it('POST /events/:event_id', () => {
      const event_stalls = {
        "stall_id": "1",
        "stall_x": 0,
        "stall_y": 0,
        "stall_height": 40,
        "stall_width": 60,
        "stall_rotation": 0
      }
      return request
        .post('/api/events/1')
        .send(event_stalls)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event_stalls');
          expect(res.body.event_stalls.length).to.equal(1);
          expect(res.body.event_stalls[0]).to.be.an('object');
        });
    });

    it('POST /events/:event_id returns with error 400 when sent an invalid or expired id', () => {
      const event_stalls = {
        "stall_id": "1",
        "stall_x": 0,
        "stall_y": 0,
        "stall_height": 40,
        "stall_width": 60,
        "stall_rotation": 0
      }
      return request
        .post('/api/events/5')
        .send(event_stalls)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /events/:event_id', () => {
      return request
        .get('/api/events/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event).to.be.an('object');
        });
    });
    it('GET /events:event_id returns with error 400 when sent an invalid or expired id', () => {
      return request
        .get('/api/events/5')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });

    it('PATCH /events/:event_id', () => {
      const event = {
        "events_img": "newimg_url_here",
        'events_name': 'newEventname'
      }
      return request
        .patch('/api/events/1')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('event');
          expect(res.body.event.events_img).to.equal('newimg_url_here');
          expect(res.body.event).to.be.an('object');
        });
    });
    it('PATCH /events/:event_id returns with error 400 when sent an invalid or expired id', () => {
      const event = {
        "events_img": "newimg_url_here"
      }
      return request
        .patch('/api/events/5')
        .send(event)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /events/:event_id/stalls - get all stalls for an event', () => {
      return request
        .get('/api/events/1/stalls')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stalls');
          expect(Object.keys(res.body.stalls).length).to.equal(4);
          expect(res.body.stalls[1]).to.be.an('object');
        });
    });
  });

  describe('/stall', () => {
    it('GET /stalls', () => {
      return request
        .get('/api/stalls')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stalls');
          expect(res.body.stalls.length).to.equal(5);
          expect(res.body.stalls[0]).to.be.an('object');
        });
    });
    it('POST /stalls', () => {
      const event = {
        "stall_name": "birthday stall",
        "stall_logo": "img_url_here",
        "stall_description": "a stall for birthdays",
        "stall_email": "birthdaystall@birthday.com",
        "stall_web_address": "www.birthdaystallforyou.com",
        "stall_ctn": "0161100000"
      }
      return request
        .post('/api/stalls')
        .send(event)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall).to.be.an('object');
        });
    });
  });
  describe('/stalls/:stall_id', () => {
    it('PATCH /stalls/:stall_id', () => {
      const stall = {
        "stall_logo": "newimg_url_here",
        'stall_name': 'newName'
      }
      return request
        .patch('/api/stalls/1')
        .send(stall)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall.stall_logo).to.equal('newimg_url_here');
          expect(res.body.stall).to.be.an('object');
        });
    });
    it('PATCH /stalls/:stall_id returns with error 400 when sent an invalid or expired id', () => {
      const stall = {
        "stall_logo": "newimg_url_here"
      }
      return request
        .patch('/api/stalls/10')
        .send(stall)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /stalls/:stall_id', () => {
      return request
        .get('/api/stalls/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall).to.be.an('object');
        });
    });
    it('GET /stalls/:stall_id returns with error 400 when sent an invalid or expired id', () => {
      return request
        .get('/api/stalls/10')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /stalls/:stall_name/login', () => {
      return request
        .get('/api/stalls/northcoders/login')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('stall');
          expect(res.body.stall).to.be.an('object');
        });
    });
    it('GET /stalls/:stall_name/login returns with error 400 when sent an invalid or expired id', () => {
      return request
        .get('/api/stalls/betty/login')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
  });
});

describe('/event/:events_id/map', () => {
  it('get /event/:events_id/map', () => {
    return request
      .get('/api/events/1/map')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.all.keys('event_stalls')
        expect(Object.keys(res.body.event_stalls).length).to.equal(4)
        expect(res.body.event_stalls).to.be.an('object')
      })
  })
  it('get /events/:events_id/map returns with error 400 when sent an invalid or expired id', () => {
    return request
      .get('/api/events/10/map')
      .expect(400)
      .then(res => {
        expect(res.body.msg).to.equal('No data returned from the query.');
      })
  })
  it('patch /event/:events_id/map', () => {
    const stall_stalls = {
      1: {
        "event_stalls_id": 2,
        "stall_x": 0,
        "stall_y": 0,
        "stall_height": 100,
        "stall_width": 25,
        "stall_rotation": 0,
        "events_id": 1,
        "stall_id": 1
      },
      2: {
        "event_stalls_id": 1,
        "stall_x": 0,
        "stall_y": 0,
        "stall_height": 25,
        "stall_width": 25,
        "stall_rotation": 0,
        "events_id": 1,
        "stall_id": 2
      },
      3: {
        "event_stalls_id": 3,
        "stall_x": 0,
        "stall_y": 0,
        "stall_height": 25,
        "stall_width": 25,
        "stall_rotation": 0,
        "events_id": 1,
        "stall_id": 3
      }
    }
    return request
      .patch('/api/events/1/map')
      .send(stall_stalls)
      .expect(201)
      .then(res => {
        expect(res.body).to.have.all.keys('event_stalls')
        expect(Object.keys(res.body.event_stalls).length).to.equal(3)
        expect(res.body.event_stalls[0].stall_height).to.equal(100)
      })
  })
})

describe('/api', () => {
  describe('/updates', () => {
    it('GET /updates', () => {
      return request
        .get('/api/updates')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('updates');
          expect(res.body.updates.length).to.equal(1);
          expect(res.body.updates[0]).to.be.an('object');
        });
    });
    it('POST /updates', () => {
      const update = {
        updates_body: 'This is another update',
        updates_time: 'Sometime',
        stall_id: 1,
        events_id: 1
      }
      return request
        .post('/api/updates')
        .send(update)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('update');
          expect(res.body.update).to.be.an('object');
        });
    });
    it('GET /updates/:events_id', () => {
      return request
        .get('/api/updates/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('update');
          expect(res.body.update.length).to.equal(2);
        });
    });
    it('GET /updates/:events_id returns with error 400 when sent an invalid or expired id', () => {
      return request
        .get('/api/updates/5')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });

    it('PATCH /updates/:updates_id', () => {
      const update = {
        updates_body: 'This is new update',
        updates_time: 'Sometime later',
        stall_id: 1,
        events_id: 1
      }
      return request
        .patch('/api/updates/1')
        .send(update)
        .expect(201)
        .then(res => {
          expect(res.body).to.have.all.keys('update');
          expect(res.body.update.updates_body).to.equal('This is new update');
          expect(res.body.update).to.be.an('object');
        });
    });
    it('PATCH /updates/:updates_id returns with error 400 when sent an invalid or expired id', () => {
      const update = {
        updates_body: 'This is new update',
        updates_time: 'Sometime later',
        stall_id: 1,
        events_id: 1
      }
      return request
        .patch('/api/updates/5')
        .send(update)
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
    it('GET /updates/:event_id/:stall_id', () => {
      return request
        .get('/api/updates/1/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.have.all.keys('updates');
          expect(res.body.updates.length).to.equal(2);
          expect(res.body.updates[0]).to.have.all.keys(
            'updates_id',
            'updates_body',
            'updates_time',
            'stall_id',
            'events_id')
          expect(res.body.updates[0].updates_body).to.equal('This is another update')
        });
    });
    it('GET /updates/:event_id/:stall_id returns with error 400 when sent an invalid or expired id', () => {
      return request
        .get('/api/updates/1/10')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal('No data returned from the query.');
        });
    });
  });
});
