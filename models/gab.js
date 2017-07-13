'use strict';
module.exports = function(sequelize, DataTypes) {
  var gab = sequelize.define('gab', {
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING(140),
    messageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        gab.hasMany(model.Like, {foreignKey:'messageId'});
        gab.belongsTo(models.Users, {foreignKey:'userId'});
      }
    }
  });
  return gab;
};