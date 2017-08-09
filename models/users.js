import bcrypt from 'bcrypt';

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        // generate a salt
        const salt = bcrypt.genSaltSync();
        // hash the password w/ the salt
        user.password = bcrypt.hashSync(user.password, salt);
        // this will be stored in db; then upon authentication, we'll check the incoming pw string against this hash using comparesync
      }
    },
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Lists);
      },
      isPassword: (encodedPassword, password) => {
        // decode the pw / check the incoming password w/ the hash that was created when user was generated
        return bcrypt.compareSync(password, encodedPassword);
      }
    }    
  });
  return Users;
}