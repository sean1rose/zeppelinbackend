import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
// const config = require('./libs/config.js');
let db = null;

module.exports = app => {
  if (!db) {
    const config = app.libs.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params      
    );
    db = {
      sequelize,
      Sequelize,
      models: {}
    };
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
      // returns array of strings referring to each file name in models directory...
      const modelDir = path.join(dir, file);
      // import and load each model file
      const model = sequelize.import(modelDir);
      // add each model to model obj
      db.models[model.name] = model;
    });
    // loop thru db.models object keys...
    Object.keys(db.models).forEach(key => {
      // establish model relationships
      db.models[key].associate(db.models);
    });
  }
  return db;
  // if (!sequelize) {
  //   sequelize = new Sequelize(
  //     config.database,
  //     config.username,
  //     config.password,
  //     config.params
  //   );
  //   // use authenticate() to test the db connection...
  //   sequelize.authenticate().then(() => {
  //     console.log('Success!');
  //   }).catch((err) => {
  //     console.log(`Unable to connect to the db cuz of error - ${err}`);
  //   });
  // }
  // return sequelize;
};