import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';


chai.use(chaiHttp);
chai.should();
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTI3NjI2NDQ0fQ.FfISUHBFjNMj0Ot3OZ49mqgPOwm03e7fyPd5bLq8d0w';

describe('Diary Entry', () => {
  describe('Get entries', () => {
    it('should return all entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('all entries successfully returned');
          done();
        });
    });

    // Test GET single request (return 200)
    it('should get the request when id exists', (done) => {
      const id = 1;
      chai.request(app)
        .get(`/api/v1/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        });
    });

    it('should not get user request when request id does not exist', (done) => {
      const id = 0;
      chai.request(app)
        .get(`/api/v1/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });

    // Test GET single request (return 404)
    it('should not get user request when request id is not a number', (done) => {
      const id = 'name';
      chai.request(app)
        .get(`/api/v1/entries/${id}`)
        .set('Authorization', userToken)
        .end((error, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });

  describe('Create entries POST', () => {
    // Test create new request (return 201)
    it('should create a new entry if required fields are entered', (done) => {
      const data = {
        title: 'Faulty play station',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: 'Lorem ipsum dolor sit amet, suas ferri solum et vix, in sea sanctus blandit placerat. Dicta iudico inermis ut quo. ',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('message').to.equals('Your request has been created successfully');
          done();
        });
    });
    it('should ot create a new entry if required fields are missing', (done) => {
      const data = {
        title: '',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: 'Lorem ipsum dolor sit amet, suas ferri solum et vix, in sea sanctus blandit placerat. Dicta iudico inermis ut quo. ',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('message').to.equals('Your request has been created successfully');
          done();
        });
    });
    it('should ot create a new entry if required fields are missing', (done) => {
      const data = {
        title: 'lorem can go',
        imageUrl: 'https://pixabay.com/en/female-diary-journal-write-865110/',
        entryNote: '',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', userToken)
        .send(data)
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.have.property('message').to.equals('Your request has been created successfully');
          done();
        });
    });
  });
});
