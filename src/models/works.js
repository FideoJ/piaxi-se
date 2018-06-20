const { queryDb } = require('../services/db');

exports.retrieveAll = async (author) => {
  const sql = `
    SELECT works_id, video_id, name, duration
    FROM works
    NATURAL JOIN video
    WHERE author = ?;
  `;
  const values = [author];
  return queryDb(sql, values);
};