module.exports = app => {
  const Users = app.db.models.Users;

  app.route('/user')
    .all(app.auth.authenticate())
    .get((req, res) => {
    // GET === findById(id, {attributes: []})
      Users.findById(req.user.id, {
        attributes: ['id', 'name', 'email']
      })
      .then(result => res.json(result))
      .catch(err => {
        res.status(412).json({msg: err.msg});
      });
      
    })
    .delete((req, res) => {
      // DELETE === destroy({where: {id: id}})
      Users.destroy({where: {id: req.user.id}})
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({msg: err.message});
        });

    })

  // POST === create(req.body)
  app.post('/users', (req, res) => {
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(err => {
        res.status(412).json({msg: err.message});
      });
  });
}