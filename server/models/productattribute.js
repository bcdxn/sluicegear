'use strict';

module.exports = function (sequelize, DataTypes) {
  var ProductAttribute = sequelize.define('ProductAttribute',
  {
    key:          {
                    type:         DataTypes.STRING(100),
                    allowNull:    false,
                    defaultValue: null,
                    validate:     { notEmpty: true }
                  },
    value:         {
                    type:         DataTypes.STRING(100),
                    allowNull:    false,
                    defaultValue: null,
                    validate:     { notEmpty: true }
                  }
  },
  {
    timestamps: true,
    freezeTableName: true
  });
  
  return ProductAttribute;
};