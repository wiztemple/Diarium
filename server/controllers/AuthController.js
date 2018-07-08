import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../dbconnection/dbconnect';

export default class AuthController {
  static async signup(request, response) {
    const {
      lastname, firstname, email, password,
    } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const insertQuery = `INSERT INTO users (lastname,firstname, email, password) VALUES ('${lastname}' ,'${firstname}', '${email}','${hashedPassword}') RETURNING * `;
    try {
      const checkIfUserExists = await db.query(userQuery);
      if (checkIfUserExists.rowCount > 0) {
        return response.status(409).json({
          status: 'fail',
          message: 'sorry user already exists',
        });
      }
      const result = await db.query(insertQuery);
      const token = jwt.sign(
        { id: result.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
      );
      return response.status(201).json({
        status: 'success',
        message: 'Account Created successfully',
        token,
        username: result.rows[0].username,
        firstname: result.rows[0].firstname,
        lastname: result.rows[0].lastname,
        email: result.rows[0].email,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.stack,
      });
    }
  }

  static async login(request, response) {
    const { email, password } = request.body;
    const insertQuery = `SELECT * FROM users WHERE email = '${email}'`;
    try {
      const result = await db.query(insertQuery);
      const validPassword = bcrypt.compareSync(password, result.rows[0].password);
      if (!validPassword || result.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'password or email is incorrect',
        });
      }
      const token = jwt.sign(
        { id: result.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: 86400 },
      );
      return response.status(200).json({
        status: 'successful',
        message: 'successfully signed in',
        token,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async getAllUsers(request, response) {
    const query = 'SELECT * FROM users;';
    try {
      const result = await db.query(query);
      return response.status(200).json({
        status: 'success',
        message: 'all users',
        users: result.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
