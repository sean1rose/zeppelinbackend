module.exports = app => {
  // load Lists model
  const Lists = app.db.models.Lists;

  app.route('/lists')
    .get((req, res) => {
      // '/lists' -> list all lists
      Lists.findAll({})
        .then(result => {
          res.json({result});
        })
        .catch(err => {
          res.status(412).json({msg: err.message});
        });
    })
    .post((req, res) => {
      // '/lists' -> save new list
      Lists.create(req.body)
        .then(result => res.json(result))
        .catch(err => {
          res.status(412).json({msg: err.message});
        });
    });

  app.route('/lists/:id')
    .get((req, res) => {
      Lists.findOne({where: req.params})
        .then(result => {
          if (result){
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(err => {
          res.status(412).json({msg: err.message});
        });
    })
    .put((req, res) => {
      // '/lists/1' -> update a list
      Lists.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({msg: err.message});
        });
    })
    .delete((req, res) => {
      // '/list/1' -> delete a list
      Lists.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(err => {
          res.status(412).json({msg: err.message});
        });
    });
};