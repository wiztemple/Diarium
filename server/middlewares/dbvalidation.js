import db from '../dbconnection/dbconnect';

export default class DbCheck {
  static async checkIfUserExists(request, response, next) {
    const { email } = request.body;
    const userQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const checkIfUserExists = await db.query(userQuery);
    if (checkIfUserExists.rowCount > 0) {
      return response.status(409).json({
        status: 'fail',
        message: 'sorry user already exists',
      });
    }
    return next();
  }
}
