'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    /*static associate({Eleve}) {
      this.hasMany(Eleve, {foreignKey: 'eleveId'})
    }
    static associate({Enseignant}) {
      this.hasMany(Enseignant, {foreignKey: 'enseignantId'})
    }*/
  };
  Cours.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Realise:{
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    //define table name
    tableName: 'cours',
    modelName: 'Cours',
  });
  return Cours;
};
