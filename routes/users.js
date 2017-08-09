module.exports = app => {
  const Users = app.db.models.Users;

  // GET === findById(id, {attributes: []})
  app.get('/users/:id', (req, res) => {
    Users.findById(req.params.id, {
      attributes: ['id', 'name', 'email']
    })
      .then(result => res.json(result))
      .catch(err => {
        res.status(412).json({msg: err.msg});
      });
  });

  // DELETE === destroy({where: {id: id}})
  app.delete('/users/:id', (req, res) => {
    Users.destroy({where: {id: req.params.id}})
      .then(result => res.sendStatus(204))
      .catch(err => {
        res.status(412).json({msg: err.message});
      });
  });

  // POST === create(req.body)
  app.post('/users', (req, res) => {
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        res.status(412).json({msg: err.message});
      });
  });
}