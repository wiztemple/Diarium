import Router from 'express';
import AuthController from '../controllers/AuthController';


// import Validation from '../middlewares/validation';

const authRoute = Router();

// sign up
authRoute.post('/signup', AuthController.signup);
// Login
authRoute.post('/login', AuthController.login);

// get all users
authRoute.get('/', AuthController.getAllUsers);
// get single user details
authRoute.get('/:userId', AuthController.getUserDetails);

export default authRoute;
