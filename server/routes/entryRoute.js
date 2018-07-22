import Router from 'express';
import EntryController from '../controllers/EntryController';
import verifyToken from '../helpers/verifyToken';
import Validate from '../middlewares/validation';

const entryRoute = Router();
entryRoute.use(verifyToken);
// get all entries
entryRoute.get('/', EntryController.getAllEntries);
// get a single entry
entryRoute.get('/:entryId', Validate.checkId, EntryController.getSingleEntry);

// create entry
entryRoute.post('/', Validate.validEntryInput, EntryController.createEntry);

// edit entry
entryRoute.put('/:entryId', Validate.checkId, Validate.validEntryInput, EntryController.updateEntry);

// delete an entry
entryRoute.delete('/:entryId', Validate.checkId, EntryController.deleteEntry);

export default entryRoute;
