import Router from 'express';
import EntryController from '../controllers/EntryController';
import verifyToken from '../helpers/verifyToken';
import Validate from '../middlewares/validation';

const entryRoute = Router();

// get all entries
entryRoute.get('/', verifyToken, EntryController.getAllEntries);

// get a single entry
entryRoute.get('/:entryId', verifyToken, EntryController.getSingleEntry);

// create entry
entryRoute.post('/', verifyToken, Validate.validEntryInput, EntryController.createEntry);

// edit entry
entryRoute.put('/:entryId', verifyToken, Validate.validEntryInput, EntryController.updateEntry);

// delete an entry
entryRoute.delete('/:entryId', verifyToken, EntryController.deleteEntry);

export default entryRoute;
