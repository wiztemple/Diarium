export default class Validate {
  static validateUserInputs(request, response, next) {
    const {
      firstname, lastname, email, password,
    } = request.body;
    if (
      !firstname || firstname === undefined || firstname.toString().trim() === '' || typeof firstname !== 'string'
    ) {
      return response.status(400).send({
        valid: false,
        message: 'firstname is required',
      });
    }
    if (
      !lastname || lastname === undefined || lastname.toString().trim() === '' || typeof lastname !== 'string'
    ) {
      return response.status(400).send({
        valid: false,
        message: 'lastname is required',
      });
    }
    if (
      !email || email === undefined || email.toString().trim() === ''
    ) {
      return response.status(400).send({
        valid: false,
        message: 'email is required',
      });
    }
    if (
      !password || password === undefined || password.toString().trim() === '' || typeof password !== 'string'
    ) {
      return response.status(400).send({
        valid: false,
        message: 'password is required',
      });
    }
    if (password.length < 6) {
      return response.status(400).json({
        valid: false,
        message: 'password must be greater than six',
      });
    }
    return next();
  }

  static checkEmail(request, response, next) {
    const { email } = request.body;
    const regex = /[^\s]*@[a-z0-9.-]*/i;
    if (!regex.test(email)) {
      return response.status(400).json({
        status: 'fail',
        message: 'invalid request email',
      });
    }
    return next();
  }
}
