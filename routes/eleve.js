var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models');

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  
  if(req.session.role != undefined) {
    if(req.session.role === "eleve"){
      const eleve = await Eleve.findOne({ where: { UserId:req.session.userid } });
      console.log("req.session.userid ==> "+ req.session.userid)

      res.render("eleve", {logged:req.session.role, userid: req.session.userid, eleve:eleve})
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
    if(req.session.role === "eleve"){
      const nom= req.body.nom
      const prenom= req.body.prenom
      const adresse= req.body.adresse
      const telephone= req.body.telephone
      await Eleve.update({ nom, prenom, adresse, telephone }, {
        where: {
          UserId: req.session.userid
        }
      });
      res.redirect("/eleve")
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});
module.exports = router;
