/* (FROM SEQUELIZE DOCS)
   Sequelize will setup a connection pool on initialization so you should ideally only ever create one instance per database 
  if you're connecting to the DB from a single process. If you're connecting to the DB from multiple processes, 
  you'll have to create one instance per process, but each instance should have a maximum connection pool size of 
  "max connection pool size divided by number of instances". 
  So, if you wanted a max connection pool size of 90 and you had 3 worker processes, 
  each process's instance should have a max connection pool size of 30.
*/
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
  },
  jwtSecret: 'z3pp3lin',
  jwtSession: {session: false}
};