import Router from 'express';
import EntryController from '../controllers/EntryController';


const entryRoute = Router();

// sign up
entryRoute.get('/entries', EntryController.getAllEntries);


export default entryRoute;
