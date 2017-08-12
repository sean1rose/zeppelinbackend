import express from 'express';
import consign from 'consign';
const PORT = 5555;
const app = express();

// disable logs created by consign module using verbose false
consign({verbose: false})
  .include('libs/config.js')
  .then('db.js')
  .then('auth.js')
  .then('libs/middlewares.js')
  // .then('models') -> don't need anymore since loaded directly by the db.js file (via sequelize.import() function)
  .then('routes')
  .then('libs/boot.js')
  .into(app);

  module.exports = app;
