'use strict';

module.exports = function (sequelize, DataTypes) {
  var Product = sequelize.define('Product',
  {
    sku:          {
                    type:         DataTypes.STRING(255),
                    allowNull:    false,
                    defaultValue: null,
                    unique:       true,
                    validate:     { notEmpty: true, notNull: true }
                  },
    uuid:         {
                    type:         DataTypes.UUID(),
                    allowNull:    false,
                    defaultValue: sequelize.UUIDV4,
                    unique:       true,
                    validate:     { isUUID: 4, notEmpty: true }
                  },
    name:         {
                    type:         DataTypes.STRING(100),
                    allowNull:    false,
                    defaultValue: null,
                    validate:     { notEmpty: true }
                  },
    description:  {
                    type:         DataTypes.STRING(255),
                    allowNull:    false,
                    defaultValue: null,
                    unique:       true,
                    validate:     { notEmpty: true }
                  },
    price:        {
                    type:         DataTypes.INTEGER,
                    allowNull:    false,
                    defaultValue: null,
                    validate:     { isInt: true }
                  },
    available:    {
                    type:         DataTypes.BOOLEAN,
                    allowNull:    false,
                    defaultValue: true
                  }
  },
  {
    timestamps: true,
    freezeTableName: true
  });
  
  return Product;
};