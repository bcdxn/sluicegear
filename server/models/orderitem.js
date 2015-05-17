'use strict';

module.exports = function (sequelize, DataTypes) {
  var OrderItem = sequelize.define('OrderItem',
  {
    personalization:  {
                        type: DataTypes.TEXT,
                        comment: 'JSON formatted perrsonalization'
                      }
  },
  {
    timestamps:      true,
    freezeTableName: true
  });
  
  return OrderItem;
};