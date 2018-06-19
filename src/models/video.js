const { queryDb } = require('../services/db');

exports.retrieveAll = async () => {
  const sql = `
    SELECT video_id, name
    FROM video;
  `;
  const values = [];
  return queryDb(sql, values);
};

exports.retrieveOne = async (video_id) => {
  const sql = `
    SELECT video_id, name
    FROM video
    WHERE video_id = ?;
  `;
  const values = [video_id];
  return queryDb(sql, values);
};

exports.retrieveRolesForOne = async (video_id) => {
  const sql = `
    SELECT role_id, name
    FROM role
    WHERE video_id = ?;
  `;
  const values = [video_id];
  return queryDb(sql, values);
};