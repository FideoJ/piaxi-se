const path = require('path');

module.exports = {
  root: path.join(__dirname, '..', '..'),
  url: 'http://localhost:3000',
  port: 3003,
  db: {
    host: 'localhost',
    user: 'piaxi',
    password: 'piaxi',
    database: 'piaxi',
    port: 3306,
  },
};
