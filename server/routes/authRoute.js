import Router from 'express';
import AuthController from '../controllers/AuthController';
import Validation from '../middlewares/validation';

const authRoute = Router();

// sign up
authRoute.post('/', Validation.validateUserInputs, Validation.checkEmail, AuthController.signup);
// Login
authRoute.post('/', Validation.validateUserInputs, Validation.checkEmail, AuthController.login);

export default authRoute;
