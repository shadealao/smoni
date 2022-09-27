'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Creneaux extends Model {
  };
  Creneaux.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date:{
      type:DataTypes.DATEONLY,
      allowNull: false
    },
    debut:{
      type:DataTypes.TIME,
      allowNull: false
    },
    fin:{
      type:DataTypes.TIME,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'creneaux',
    modelName: 'Creneaux',
  });
  return Creneaux;
};
