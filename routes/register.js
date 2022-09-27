var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models'); // import models
const bcrypt = require('bcrypt');
//const db = require("../models");
//const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models'); // import models

//const Tutorial = db.Tutorial;
//const Op = db.Sequelize.Op;
/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('register');
  
});

router.post('/', function(req,res){
  const email= req.body.email
  const pwd = req.body.mdp
  if(pwd == req.body.mdp2){
    try{
      const password = bcrypt.hashSync(pwd, 10);
        const user = User.create({email,password});
        return res.render('index');
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }

  }
  else {
    res.render('register');
  }
  //res.render('register');
  //db.Tutorial.User.Create()
  //console.log(req.body.email);
  //const jane = User.create({ email: req.body.email, password: req.body.mdp, role:'user', active:true});
  // Jane exists in the database now!
  //console.log(jane instanceof User); // true
  //console.log(jane.email); // "Jane"
  
  
  
});
module.exports = router;
