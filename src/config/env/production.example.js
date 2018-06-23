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
  redis: {
    host: 'localhost',
    port: '6379',
    db: 2,
    namespaces: {
      session: 'piaxi-se:session',
      tasks: 'piaxi-se:tasks',
    },
  },
  filer: {
    url: 'https://piaxi-filer.resetbypear.com',
  },
  weixin: {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    appid: '',
    appsecret: '',
  },
};
