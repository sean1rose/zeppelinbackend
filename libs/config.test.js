module.exports = {
  database: 'zeppelinbackend',
  username: '',
  password: '',
  params: {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: true
    },
    pool: {
      max: 9,
      min: 0,
      idle: 10000
    }
  },
  jwtSecret: 'z3pp3lin',
  jwtSession: {session: false}
};