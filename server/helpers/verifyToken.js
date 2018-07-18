import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;
const verifyToken = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    request.userId = decoded;
    next();
  } catch (error) {
    return response.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
  return null;
};

export default verifyToken;
