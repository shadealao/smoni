'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Produit extends Model {
  };
  Produit.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description:{
      type:DataTypes.STRING
    },
    prix:{
      type:DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    //define table name
    tableName: 'produit',
    modelName: 'Produit',
  });
  return Produit;
};
