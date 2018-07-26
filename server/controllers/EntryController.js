import db from '../config/dbconnect';
import parsedInt from '../helpers/parseInt';

export default class EntryController {
  /**
   * @static method to get all entries
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @return an object containing the created entry
   */
  static async getAllEntries(request, response) {
    const userId = request.userId.id;
    const query = `SELECT * FROM entries WHERE user_id = '${userId}' ORDER BY id ASC`;
    try {
      const result = await db.query(query);
      if (!result) {
        return response.status(404).json({
          status: 'fail',
          message: 'no entry was found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'all entries successfully returned',
        entries: result.rows,
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
    const userId = request.userId.id;
    const { entryId } = request.params;
    console.log('okay nh', entryId);
    const parsedId = parsedInt(entryId);
    const query = `SELECT * FROM entries WHERE id = ${parsedId} AND user_id = ${userId}`;
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
        entry: data.rows[0],
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
    const userId = request.userId.id;
    const {
      title, imageUrl, entryNote,
    } = request.body;
    try {
      const entryQuery = `SELECT * FROM entries WHERE title = '${title}'`;
      const checkIfEntryExists = await db.query(entryQuery);
      if (checkIfEntryExists.rowCount > 0) {
        return response.status(409).json({
          status: 'fail',
          message: 'sorry entry already exists',
        });
      }
      const insertQuery = `INSERT INTO entries (user_id, title, image_url, entry_note) VALUES ('${userId}','${title}','${imageUrl}','${entryNote}') RETURNING * `;
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
          userId: newEntry.rows[0].user_id,
          title: newEntry.rows[0].title,
          imageUrl: newEntry.rows[0].image_url,
          entryNote: newEntry.rows[0].entry_note,
          createdAt: newEntry.rows[0].created_at,
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
    const userId = request.userId.id;
    const parsedId = parsedInt(entryId);
    const query = `SELECT * FROM entries WHERE id = ${parsedId} AND user_id = ${userId}`;
    try {
      const result = await db.query(query);
      if (result.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'no such entry was found',
        });
      }
      const {
        title, imageUrl, entryNote,
      } = request.body;
      const updateQuery = `UPDATE entries SET title = '${title}', image_url = '${imageUrl}', entry_note = '${entryNote}' WHERE id = ${entryId} AND user_id = ${userId} RETURNING *`;
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

  static deleteEntry(request, response) {
    const userId = request.userId.id;
    const { entryId } = request.params;
    const parsedId = parsedInt(entryId);
    const query = `DELETE FROM entries WHERE id = ${parsedId} AND user_id = '${userId}'`;
    try {
      db.query(query);
      return response.status(200).json({
        status: 'success',
        message: 'successfully deleted',
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.stack,
      });
    }
  }
}
