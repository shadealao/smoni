'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Enseignant extends Model {
    //static associate({User}) {
      // define association here
     // this.hasOne(User, {foreignKey: 'userId'})
     // this.hasOne(User, {foreignKey: 'userId',  as: 'posts' })
    //}
  };
  Enseignant.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nom:{
      type:DataTypes.STRING
    },
    prenom:{
      type:DataTypes.STRING
    },
    adresse:{
      type:DataTypes.STRING
    },
    telephone:{
      type:DataTypes.INTEGER
    },
    active: {
      type: DataTypes.BOOLEAN
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'enseignant',
    modelName: 'Enseignant',
  });
  return Enseignant;
};
