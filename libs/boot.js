module.exports = app => {
  app.db.sync().done(() => {
    app.listen(app.get('port'), () => {
      console.log(`zeppelinbackend api fired up at port ${app.get('port')}`);
    })
  })
};