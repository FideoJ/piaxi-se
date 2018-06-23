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

exports.createOneWorks = async (video_id, author) => {
  const sql = `
    INSERT INTO works (video_id, author)
    VALUES (?, ?);
  `;
  const values = [video_id, author];
  return queryDb(sql, values);
};

exports.retrieveOne = async (works_id, author) => {
  const sql = `
    SELECT works_id, video_id
    FROM works
    WHERE works_id = ? AND author = ?;
  `;
  const values = [works_id, author];
  return queryDb(sql, values);
};
