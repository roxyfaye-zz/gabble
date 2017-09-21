'use strict';
module.exports = function(sequelize, DataTypes) {
  var gabs = sequelize.define('gabs', {
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING(140),
    messageId: DataTypes.STRING(144)
  }, {
    classMethods: {
      associate: function(models) {
        gab.hasMany(models.Like, {foreignKey:'messageId'});
        gab.belongsTo(models.Users, {foreignKey:'userId'});
      }
    }
  });
  return gabs;
};