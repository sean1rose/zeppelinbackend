import bodyParser from 'body-parser';

module.exports = app => {
  app.set('port', 5555);
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
};