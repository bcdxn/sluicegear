'use strict';

module.exports = function (sequelize, DataTypes) {
  var Picklist = sequelize.define('Picklist',
  {
    type:   {
              type:         DataTypes.STRING,
              allowNull:    false,
              defaultValue: null,
              validate:     { notEmpty: true }
            },
    key:    {
              type:         DataTypes.STRING,
              allowNull:    false,
              defaultValue: null,
              unique:       true,
              validate:     { notEmpty: true }
            },
    value:  {
              type:         DataTypes.STRING,
              allowNull:    false
            },
    label:  {
              type:         DataTypes.STRING,
              defaultValue: null
            },
    active: {
              type:         DataTypes.BOOLEAN,
              allowNull:    false,
              defaultValue: true
            }
  },
  {
    timestamps: false,
    freezeTableName: true
  });
  
  return Picklist;
};