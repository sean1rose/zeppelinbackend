module.exports = app => {
  const Lists = app.models.lists;
  app.get('/lists', (req, res) => {
    Lists.findAll({}, (lists) => {
      // res.json({lists: lists});
      res.json({lists});
    });
  });
};