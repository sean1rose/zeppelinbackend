import express from 'express';
import consign from 'consign';
const PORT = 5555;
const app = express();

consign()
  .include('libs/config.js')
  .then('db.js')
  .then('libs/middlewares.js')
  // .then('models') -> loaded directly by the db.js file (via sequelize.import() function)
  .then('routes')
  .then('libs/boot.js')
  .into(app);
