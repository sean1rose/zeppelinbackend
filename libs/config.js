module.exports = {
  database: 'zeppelinbackend',
  username: '',
  password: '',
  params: {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  }
};