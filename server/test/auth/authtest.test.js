import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
  describe('Create user account', () => {
    it('should create user account with valid inputs', (done) => {
      const user = {
        firstname: 'Sullivan',
        lastname: 'Wisdom',
        email: 'wiztemple8@gmail.com',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          done();
        });
    });
  });
});
