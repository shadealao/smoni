'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //static associate({Post}) {
      // define association here
     // this.hasMany(Post, {foreignKey: 'userId',  as: 'posts' })
    //}
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: {msg: "It must be a valid Email  address"},
      }
    },
    role:{
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue:'user'
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
      // allowNull defaults to true
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};

/*
const Etudiant = sequelize.define('Etudiant', {
    // Model attributes are defined here
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      },
      comment: 'This is a column name that has a comment'/*,
      unique: true */
   /* },
    prenom: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    //indexes: [{ unique: true, fields: ['someUnique'] }]
  });
  */


// MAJ de la bdd 
// Solution temporaire avant d'utiliser la MIGRATION
//await sequelize.sync({ alter: true });
//console.log("All models were synchronized successfully.");
// This will run .sync() only if database name ends with '_test'
// sequelize.sync({ force: true, match: /_test$/ });

