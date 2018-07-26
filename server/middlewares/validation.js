export default class Validate {
  static validateUserInputs(request, response, next) {
    const {
      firstname, lastname, email, password,
    } = request.body;
    const nameFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const emailPattern = /[^\s]*@[a-z0-9.-]*/i;
    if (
      !firstname || firstname === undefined || firstname.toString().trim() === '' || typeof firstname !== 'string'
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'firstname is required',
      });
    }
    if (nameFormat.test(firstname)) {
      return response.status(400).json({
        status: 'fail',
        message: 'firstname cannot contain special character',
      });
    }
    if (
      !lastname || lastname === undefined || lastname.toString().trim() === '' || (typeof lastname !== 'string')
    ) {
      return response.status(400).send({
        valid: false,
        message: 'lastname is required',
      });
    }
    if (nameFormat.test(lastname)) {
      return response.status(400).json({
        status: 'fail',
        message: 'lastname cannot contain special character',
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
    if (!emailPattern.test(email.trim())) {
      return response.status(400).json({
        status: 'fail',
        message: 'email is invalid',
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

  static validEntryInput(request, response, next) {
    const {
      title, imageUrl, entryNote,
    } = request.body;

    if (
      !title || title === undefined || title.trim() === '' || typeof title !== 'string'
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'entry title cannot be empty',
      });
    }
    if (
      (typeof imageUrl !== 'string')
    ) {
      return response.status(400).send({
        valid: false,
        message: 'entry url can only be a string',
      });
    }
    if (
      !entryNote || entryNote === undefined || entryNote.toString().trim() === '' || typeof entryNote !== 'string'
    ) {
      return response.status(400).send({
        status: 'fail',
        message: 'entry note cannot be empty',
      });
    }
    return next();
  }

  static checkId(request, response, next) {
    const { entryId } = request.params;
    console.log(typeof parseInt(entryId, 10) !== 'number');
    if (typeof parseInt(entryId, 10) !== 'number') {
      return response.status(400).json({
        status: 'fail',
        message: 'id must be a number',
      });
    }
    if (!entryId || entryId === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'id not found',
      });
    }
    return next();
  }
}
