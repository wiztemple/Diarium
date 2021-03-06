import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
chai.should();
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJvYmlAZ21haWwuY29tIiwiaWF0IjoxNTMyNjM2MjAyLCJleHAiOjE1MzI3MjI2MDJ9.mt16o3b7ZF0N__Wj7CLR7EumLUm5Eop1Ef5_JoeHxyw';
const title = Math.random().toString(36).substring(2, 15);

describe('Diary Entry', () => {
  describe('Get entries', () => {
    it('should return all entries', (done) => {
      chai.request(app)
        .get('/api/v1/users/entries')
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('all entries successfully returned');
          done();
        });
    });

    // Test GET single request (return 200)
    it('should get the entry when id exists', (done) => {
      const id = 2;
      chai.request(app)
        .get(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          done();
        });
    });

    it('should not get user entry if id does not exist', (done) => {
      const id = 57;
      chai.request(app)
        .get(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user request when request id is not a number', (done) => {
      const id = 'name';
      chai.request(app)
        .get(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  describe('Create entries POST', () => {
    // Test create new request (return 201)
    it('should create a new entry if the required fields are entered', (done) => {
      const data = {
        title: `${title}`,
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: 'Lorem ipsum dolor sit amet, suas ferri solum et vix, in sea sanctus blandit placerat. Dicta iudico inermis ut quo. ',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.an('object');
          response.body.should.have.property('message').to.equals('entry successfully created');
          done();
        });
    });
    it('should not create a new entry if required fields are missing', (done) => {
      const data = {
        title: '',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: 'Lorem ipsum dolor sit amet, suas ferri solum et vix, in sea sanctus blandit placerat. Dicta iudico inermis ut quo. ',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equals('entry title cannot be empty');
          done();
        });
    });
    it('should not create an entry if entryNote is missing', (done) => {
      const data = {
        title: 'lorem can go',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: '',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equals('entry note cannot be empty');
          done();
        });
    });
  });
  describe('/PUT api/v1/users/entries/:id', () => {
    // Test update request (return 200)
    it('should update entry if required fields entered', (done) => {
      const id = 6;
      const data = {
        title: 'Love the right way',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/love',
        entryNote: 'I made mistakes, I learn slowly but I learn, I promise to mend my ways',
      };
      chai.request(app)
        .put(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message').to.equals('entry successfully updated');
          done();
        });
    });

    // Test update request (return 400)
    it('should not update entry if required fields are empty', (done) => {
      const id = 4;
      const data = {
        title: '',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/love',
        entryNote: '',
      };
      chai.request(app)
        .put(`/api/v1/users/requests/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });

    // Test update request (return 404)
    it('should not update request if request id is not found', (done) => {
      const id = 0;
      const data = {
        title: 'Love the right way 2',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/love',
        entryNote: 'I made mistakes, I learn slowly but I learn, I promise to mend my ways',
      };
      chai.request(app)
        .put(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
  describe('/DELETE api/v1/users/entries/:id', () => {
    it('should delete an entry when the id exists', (done) => {
      const id = 1;
      chai.request(app)
        .delete(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should not delete an entry when the id does not exist', (done) => {
      const id = 0;
      chai.request(app)
        .delete(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equals('invalid id');
          done();
        });
    });

    it('should not delete an entry when the id is not a number', (done) => {
      const id = 'lost';
      chai.request(app)
        .delete(`/api/v1/users/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equals('invalid id');
          done();
        });
    });
  });
});
