'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Eleve extends Model {
    /*
    associate({User}) {
      this.hasOne(User, {foreignKey: 'userId',  as: 'userId2' })
    } */
  };
 

  Eleve.init({
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
    heureRestantes:{
      type:DataTypes.INTEGER,
      defaultValue:0,
      validate:{
        isNumeric: {msg: "Veuillez saisir un nombre"},
      }
    },
    active: {
      type: DataTypes.BOOLEAN
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'eleve',
    modelName: 'Eleve',
  });
  return Eleve;
};


// MAJ de la bdd 
// Solution temporaire avant d'utiliser la MIGRATION
//await sequelize.sync({ alter: true });
//console.log("All models were synchronized successfully.");
// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ force: true, match: /_test$/ });

