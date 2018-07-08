import Router from 'express';
import AuthController from '../controllers/AuthController';
import Validation from '../middlewares/validation';

const authRoute = Router();

// sign up
authRoute.post('/signup', Validation.validateUserInputs, Validation.checkEmail, AuthController.signup);
// Login
authRoute.post('/login', Validation.validateUserInputs, Validation.checkEmail, AuthController.login);

export default authRoute;
