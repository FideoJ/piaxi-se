const { queryDb } = require('../services/db');

exports.retrieveAll = async () => {
  const sql = `
    SELECT bgm_id, name, duration
    FROM bgm;
  `;
  const values = [];
  return queryDb(sql, values);
};