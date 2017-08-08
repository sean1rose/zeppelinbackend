module.exports = app => {
  // load Lists model
  const Lists = app.db.models.Lists;
  app.get('/lists', (req, res) => {
    // sequelize's findAll() method, get and return all lists...
    Lists.findAll({}).then(lists => {
      res.json({lists});
    });
  });
};