module.exports = app => {
  app.get('/', (req, res) => {
    res.json({status: `check out the data coming back from port`});
  });
};