import express from 'express';
import consign from 'consign';
const PORT = 5555;
const app = express();

consign()
  .include('db.js')
  .then('models')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(app);
