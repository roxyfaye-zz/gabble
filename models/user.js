'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    displayname: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {

        user.hasMany(models.gab,{foreignKey: 'userId'}),
        user.hasMany(models.like,{foreignKey: 'userId'})

      }
    }
  });
  return Users;
};