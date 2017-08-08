module.exports = app => {
  // const Lists = app.models.lists;
  const Lists = app.db.models.Lists;
  app.get('/lists', (req, res) => {
    Lists.findAll({}).then(lists => {
      res.json({lists});
    });
  });
};