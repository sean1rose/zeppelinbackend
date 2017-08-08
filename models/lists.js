module.exports = (sequelize, DataType) => {
  // define('name', {attributes}, {options}) -> 'define' -> define mappings b/w a model and table
    // attributes -> represent fields of a table
    // options -> 
      // associate(models) -> allows models' r/s
  const Lists = sequelize.define('Lists', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Lists.belongsTo(models.Users);
      }
    }
  });
  return Lists;
};