const { queryDb } = require('../services/db');

exports.retrieveAll = async () => {
  const sql = `
    SELECT bgm_id, name
    FROM bgm;
  `;
  const values = [];
  return queryDb(sql, values);
};