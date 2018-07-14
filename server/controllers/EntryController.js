import db from '../dbconnection/dbconnect';

export default class EntryController {
  /*
   * @static method to get all entries
   * @param {object} request - request object
   * @param {object} response -response object
   */
  static async getAllEntries(request, response) {
    const { userId } = request.body;
    const query = `SELECT * FROM entries WHERE user_id = ${userId}) ORDER BY id ASC`;
    try {
      const data = await db.query(query);
      if (!data) {
        return response.status(404).json({
          status: 'fail',
          message: 'no entry was found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'all entries successfully returned',
        entries: data.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  /**
   * @static method to get a single entry
   * @param {object} request  request object
   * @param {object} response response object
   */
  static async getSingleEntry(request, response) {
    const { userId } = request.body;
    const { entryId } = request.params;
    const query = `SELECT * FROM entries WHERE id = ${entryId} AND user_id = ${userId}`;
    try {
      const data = await db.query(query);
      if (!data) {
        return response.status(404).json({
          status: 'fail',
          message: 'entry not found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'entry successfully returned',
        entry: data.rows[0].entry,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * Create an entry
   * @param {*} request
   * @param {*} response
   * @return an object containing the created entry
   */
  static async createEntry(request, response) {
    const {
      title, imageUrl, entryNote,
    } = request.body;
    try {
      const entryQuery = `SELECT * FROM entrie WHERE id = '${entryId}'`;
      const checkIfEntryExists = await db.query(entryQuery);
      if (checkIfEntryExists.rowCount > 0) {
        return response.status(409).json({
          status: 'fail',
          message: 'sorry entry already exists',
        });
      }
      const insertQuery = `INSERT INTO entries (title, imageUrl, entry_note) VALUES ('${title}' ,'${imageUrl}', '${entryNote}',) RETURNING * `;
      const newEntry = await db.query(insertQuery);
      if (!newEntry) {
        return response.status(403).json({
          status: 'fail',
          message: 'entry was not created',
        });
      }
      return response.status(201).json({
        status: 'success',
        message: 'entry successfully created',
        entry: {
          id: newEntry.rows[0].id,
          userId: newEntry.rows[0].userId,
          title: newEntry.rows[0].title,
          imageUrl: newEntry.rows[0].imageUrl,
          entryNote: newEntry.rows[0].entryNote,
          createdAt: newEntry.rows[0].createdAt,
        },
      });
    } catch (error) {
      response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
    return null;
  }

  /**
   * @static method to update an existing entry
   * @param {object} request - request object
   * @param {object} response - response object
   * @return an updated entry object
   */
  static async updateEntry(request, response) {
    const { entryId } = request.params;
    const query = `SELECT * FROM entries WHERE id = ${entryId} AND user_id = ${userId}`;
    try {
      const result = await db.query(query);
      if (result.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'no such entry was found',
        });
      }
      const {
        title, imageUrl, entryNote, updatedAt,
      } = request.body;
      const updateQuery = `UPDATE entries SET title = ${title}, image = ${imageUrl}, entry_note = ${entryNote}, updated_at = ${updatedAt} WHERE entry_id = ${entryId} AND user_id = ${userId}`;
      const updatedEntry = await db.query(updateQuery);
      if (!updatedEntry) {
        return response.status(403).json({
          status: 'fail',
          message: 'entry was not updated',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'entry successfully updated',
        data: updatedEntry.rows[0],
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async deleteEntry(request, response) {
    const { entryId } = request.params;
    const query = `DELETE FROM entries WHERE entry_id = ${entryId} AND user_id = ${userId}`;
    const { error, result } = await db.query(query);
    if (error) {
      return response.status(404).json({
        status: 'fail',
        message: 'entry was not found in the database',
      });
    }
    return response.status(200).json({
      status: 'success',
      message: 'entry was successfully deleted',
      result,
    });
  }
}
