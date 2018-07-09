import db from '../dbconnection/dbconnect';

export default class EntryController {
  static async getAllEntries(request, response) {
    const query = 'SELECT * FROM entries';
    const result = await db.query(query);
    try {
      if (result.rowCount === 0) {
        return response.status(403).json({
          status: 'fail',
          message: 'no entry was found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'all entries',
        entries: result.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
