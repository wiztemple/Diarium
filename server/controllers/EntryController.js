import db from '../dbconnection/dbconnect';

export default class EntryController {
  /**
   * @static method to get all entries
   * @param {object} request - request object
   * @param {object} response -response object
   */
  static async getAllEntries(request, response) {
    const { userId } = request.body;
    const query = `SELECT * FROM entries WHERE user_id = ${userId}) ORDER BY id ASC`;
    const { error, data } = await db.query(query);
    if (error) {
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
  }

  /**
   * @static method to get a single entry
   * @param {object} request  request object
   * @param {object} response response object
   */
  static async getSingleEntry(request, response) {
    const { entryId } = request.params;
    const query = `SELECT * FROM entries WHERE id = ${entryId} AND user_id = ${userId}`;
    const { error, data } = await db.query(query);
    if (error) {
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
  }

  /**
   * Create an entry
   * @param {*} request
   * @param {*} response
   * @return an object containing the created entry
   */
  static async createEntry(request, response) {
    const {
      title, imageUrl, entryNote, userId, createdAt,
    } = request.body;
    const insertQuery = `INSERT INTO entries (title, imageUrl, entry_note, user_id, createdAt) VALUES ('${title}' ,'${imageUrl}', '${entryNote}', '${userId}','${createdAt}') RETURNING * `;
    const { error, data } = await db.query(insertQuery);
    if (error) {
      return response.status(403).json({
        status: 'fail',
        message: error.message,
      });
    }
    return response.status(201).json({
      status: 'success',
      message: 'entry successfully created',
      entry: {
        id: data.rows[0].id,
        userId: data.rows[0].userId,
        title: data.rows[0].title,
        imageUrl: data.rows[0].imageUrl,
        entryNote: data.rows[0].entryNote,
        createdAt: data.rows[0].createdAt,
      },
    });
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
    const { error, updatedEntry } = await db.query(updateQuery);
    if (error) {
      return response.status(404).json({
        status: 'fail',
        message: error.message,
      });
    }
    return response.status(200).json({
      status: 'success',
      message: 'entry successfully updated',
      data: updatedEntry.rows[0],
    });
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
