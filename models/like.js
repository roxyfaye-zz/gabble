'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    like: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return like;
};