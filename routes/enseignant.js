var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models');

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  
  if(req.session.role != undefined) {
    if(req.session.role === "enseignant"){
      const enseignant = await Enseignant.findOne({ where: { UserId:req.session.userid } });
      res.render("enseignant", {logged:req.session.role, userid: req.session.userid, enseignant:enseignant})
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});



router.post("/:id", async(req, res, next)=> {
  if(req.session.role != undefined) {
    if(req.session.role === "enseignant"){
      const nom= req.body.nom
      const prenom= req.body.prenom
      const adresse= req.body.adresse
      const telephone= req.body.telephone
      await Enseignant.update({ nom, prenom, adresse, telephone }, {
        where: {
          UserId: req.session.userid
        }
      });
      res.redirect("/enseignant")
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});
module.exports = router;
