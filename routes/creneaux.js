var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models'); // import models


router.get('/', async(req, res, next)=> {
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      const creneaux = await Creneaux.findAll();
      res.render('creneaux',{logged:req.session.role, userid: req.session.userid, creneaux: creneaux});
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

router.post('/', function(req,res){
  
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant")){
      const date= req.body.date
      const debut = req.body.debut
      const fin = req.body.fin
      
      Creneaux.create({date,debut,fin});
      
      res.redirect('creneaux');
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
  
});
module.exports = router;
