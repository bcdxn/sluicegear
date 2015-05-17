'use strict';

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order',
  {
    itemsTotalPrice:  {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    shippingPrice:    {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    salesTax:         {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    adjustment:       {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    paymentMethod:    {
                        type:         DataTypes.STRING,
                        allowNull:    false,
                        defaultValue: null
                      },
    paymentId:  {
                        type:         DataTypes.STRING,
                        unique:       true,
                        defaultValue: null
                      },
    paymentReceived:  {
                        type:         DataTypes.BOOLEAN,
                        allowNull:    false,
                        defaultValue: false
                      }
  },
  {
    timestamps:      true,
    freezeTableName: true
  });
  
  return Order;
};