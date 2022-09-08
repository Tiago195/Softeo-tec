require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.USER_NAME || 'root',
    'password': process.env.PASSWORD || null,
    'database': process.env.DATABASE || 'database_development',
    'host': process.env.HOST || '127.0.0.1',
    'port': process.env.PORT_DB,
    'dialect': 'postgres'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
};
