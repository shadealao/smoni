var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models');

/* GET users listing. */
router.get('/', async(req, res, next)=> {
  
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant")){
      const users = await User.findAll();
      console.log("Utilisateur ====> " + JSON.stringify(users, null, 4))
      res.render("users", {logged:req.session.role, userid: req.session.userid, utilisateur:users})
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

router.get("/:id", async(req, res, next)=> {
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant")){
      const users = await User.findOne({ where: { id: req.params.id } });
      res.render("users", {logged:req.session.role, utilisateur:users, action:'modifier', ident: req.params.id})
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
    if((req.session.role === "admin") || (req.session.role === "enseignant")){
      const email= req.body.email
      const role= req.body.role
      const actif= req.body.actif
      const users = await User.findOne({ where: { id: req.params.id } });
      if(users.role != role) {
        if(users.role === 'eleve'){
          //désactiver from eleve if exist email 
          await Eleve.update({ active: false }, {
            where: {
              UserId: users.id
            }
          });
        }
        else if(users.role === 'enseignant'){
          //désactiver from enseignant if exist email 
          await Enseignant.update({ active: false }, {
            where: {
              UserId: users.id
            }
          });
        }
        if(role === 'eleve'){
          const [user, created] = await Eleve.findOrCreate({
            where: { UserId: users.id },
            defaults: {
              active: true
            }
          });
          if (!created) {
            await Eleve.update({ active: true }, {
              where: {
                UserId: users.id
              }
            });
          }
          
        }
        else if(role === 'enseignant'){
          const [user, created] = await Enseignant.findOrCreate({
            where: { UserId: users.id },
            defaults: {
              active: true
            }
          });
          if (!created) {
            await Enseignant.update({ active: true }, {
              where: {
                UserId: users.id
              }
            });
          }
        }
        
        
      }
      await User.update({ email, role, actif }, {
        where: {
          id: req.params.id
        }
      });
      res.redirect("/users#"+req.params.id)
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});
module.exports = router;
