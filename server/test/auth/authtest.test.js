import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);
chai.should();
const email = Math.random().toString(36).substring(2, 15);
describe('Authentication', () => {
  describe('Create user account', () => {
    it('should create user account with valid inputs', (done) => {
      const user = {
        firstname: 'Sullivan',
        lastname: 'Wisdom',
        email: `${email}@gmail.com`,
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
    it('should not create account for an already existing user', (done) => {
      const user = {
        firstname: 'Sullivan',
        lastname: 'Wisdom',
        email: 'wiztemple9@gmail.com',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(409);
          response.body.should.have.property('message').to.equal('sorry user already exists');
          done();
        });
    });
    it('should not create account with empty firstname', (done) => {
      const user = {
        firstname: '',
        lastname: 'Wisdom',
        email: 'wiztemple9@gmail.com',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('firstname is required');
          done();
        });
    });
    it('should not create account with empty lasttname', (done) => {
      const user = {
        firstname: 'wisdom',
        lastname: '',
        email: 'wiztemple9@gmail.com',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('lastname is required');
          done();
        });
    });
    it('should not create account with empty email', (done) => {
      const user = {
        firstname: 'loyce',
        lastname: 'Wisdom',
        email: '',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('email is required');
          done();
        });
    });
    it('should not create account with empty password', (done) => {
      const user = {
        firstname: 'lolll',
        lastname: 'Wisdom',
        email: 'wiztemple9@gmail.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('password is required');
          done();
        });
    });
    it('should not create account if password length is less than 6', (done) => {
      const user = {
        firstname: 'wireddd',
        lastname: 'Wisdom',
        email: 'wiztemple9@gmail.com',
        password: 'last',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('password must be greater than six');
          done();
        });
    });
    it('should not create account with wrong email', (done) => {
      const user = {
        firstname: 'wireddd',
        lastname: 'Wisdom',
        email: 'wiztemple9gmail.com',
        password: 'last5555',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('invalid request email');
          done();
        });
    });
    it('should login a registered user', (done) => {
      const user = {
        email: 'wiztemple9@gmail.com',
        password: 'lastdays00777',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message').to.equal('successfully signed in');
          done();
        });
    });
    it('should not login a user with incorrect password', (done) => {
      const user = {
        email: 'wiztemple9@gmail.com',
        password: 'lastdays00',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').to.equal('password or email is incorrect');
          done();
        });
    });
    it('should not login a user with incorrect email address', (done) => {
      const user = {
        email: 'wiz@gmail.com',
        password: 'lastdays0077',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').to.equal('password or email is incorrect');
          done();
        });
    });
    it('should return all registered users', (done) => {
      chai.request(app)
        .get('/api/v1/auth/users')
        .send()
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message').to.equal('all users');
          response.should.be.an('object');
          done();
        });
    });
  });
});
