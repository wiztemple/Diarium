import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;
const verifyToken = (request, response, next) => {
  const token = request.headers.token || request.body.token;
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (decoded === undefined) {
        return response.status(401).json({
          status: 'fail',
          message: 'Access denied, login please',
        });
      }
      request.userId = decoded.id;
      return next();
    });
  }
  return response.status(401).json({
    status: 'fail',
    message: 'please login with email or password',
  });
};

export default verifyToken;
