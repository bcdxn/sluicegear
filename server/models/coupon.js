'use strict';

module.exports = function (sequelize, DataTypes) {
  var Coupon = sequelize.define('Coupon',
  {
    code:             {
                        type:         DataTypes.STRING,
                        allowNull:    false,
                        defaultValue: null,
                        validate:     { notEmpty: true }
                      },
    minimumPrice:     {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    percentDiscount:  {
                        type:         DataTypes.DECIMAL,
                        allowNull:    false,
                        defaultValue: 0.0,
                        validate:     { isDecimal: true }
                      },
    fixedDiscount:    {
                        type:         DataTypes.INTEGER,
                        allowNull:    false,
                        defaultValue: 0,
                        validate:     { isInt: true },
                        comment:      'Divide by 100 to get $0.00'
                      },
    freeShipping:     {
                        type:         DataTypes.BOOLEAN,
                        allowNull:    false,
                        defaultValue: false
                      },
    active:           {
                        type:         DataTypes.BOOLEAN,
                        allowNull:    false,
                        defaultValue: true
                      }
  },
  {
    timestamps:      true,
    freezeTableName: true
  });
  
  return Coupon;
};