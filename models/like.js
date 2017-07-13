'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    like: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        like.belonsTo(models.Users, { foreignKey: 'userId'});
        like.belongTo(models.Messages, { foreignKey: 'messageId'})
      }
    }
  });
  return like;
};