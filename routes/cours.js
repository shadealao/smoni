var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models'); // import models


router.get('/:id', async(req, res, next)=> {
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      const creneaux = await Creneaux.findOne({ where: { id: req.query.idcreneau } });
      const eleve = await Eleve.findOne({ where: { id: req.params.id } });
      const enseignant = await Enseignant.findAll();
      //const cours2 = await Cours.findAll();

      const [results, metadata] = await sequelize.query(
        ' SELECT * FROM cours JOIN creneaux ON creneaux.id = cours."CreneauxId" JOIN eleve ON eleve.id = cours."EleveId" JOIN enseignant ON enseignant.id = cours."EnseignantId" '
      );
      res.render('cours',{logged:req.session.role, userid: req.session.userid, formulaire:true, eleve: eleve, creneau: creneaux, enseignants: enseignant, cours1:results});
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

router.get('/reserver/:id', async(req, res, next)=> {
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      const creneaux = await Creneaux.findOne({ where: { id: req.query.idcreneau } });
      const eleve = await Eleve.findOne({ where: { id: req.params.id } });
      //const enseignant = await Enseignant.findOne({ where: { id: req.query.idenseignant } });
      //const Cours = await Cours.create({creneaux,eleve,enseignant});
      //const cours2 = await Cours.findAll();
      const [results, metadata] = await sequelize.query(
        ' SELECT * FROM cours JOIN creneaux ON creneaux.id = cours."CreneauxId" JOIN eleve ON eleve.id = cours."EleveId" JOIN enseignant ON enseignant.id = cours."EnseignantId" '
      );
      
      res.render('cours',{logged:req.session.role, userid: req.session.userid,formulaire: true, cours1: results});
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

router.get('/', async(req,res) => {
  
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      
      //const cours2 = await Cours.findAll();
      const [results, metadata] = await sequelize.query(
        ' SELECT * FROM cours JOIN creneaux ON creneaux.id = cours."CreneauxId" JOIN eleve ON eleve.id = cours."EleveId" JOIN enseignant ON enseignant.id = cours."EnseignantId" '
      );
      console.log(JSON.stringify(results, null, 2));
      res.render('cours',{logged:req.session.role, userid: req.session.userid, cours1: results});
      
      //res.redirect('creneaux');
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
  
});
router.post('/', async(req,res) => {
  
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      const CreneauxId= await req.body.creneau
      const EnseignantId = await req.body.listeenseignant
      const eleve = await Eleve.findOne({ where: { UserId:req.session.userid} });
      const creneaux = await Creneaux.findOne({ where: { id:req.body.creneau} });
      const EleveId = eleve.id
      
      var timeStart = new Date("01/01/2007 " + creneaux.debut);
      var timeEnd = new Date("01/01/2007 " + creneaux.fin);

      var difference = timeEnd - timeStart;            
      var diff_result = new Date(difference);    

      var hourDiff = diff_result.getHours();

      const majheure = (eleve.heureRestantes - hourDiff)
      

      console.log("******************** eleve.heureRestantes ********************"+ eleve.heureRestantes)
      console.log("******************** creneaux.debut ********************"+ creneaux.debut)
      console.log("******************** creneaux.fin ********************"+ creneaux.fin)
      console.log("******************** intermajheure ********************"+ hourDiff)
      console.log("******************** majheure ********************"+ majheure)
      if(majheure >= 0 ){
        await Cours.create({EleveId,EnseignantId,CreneauxId});
        await Creneaux.update({active:false}, {
          where: { id: req.body.creneau}
        });
        await Eleve.update({heureRestantes:majheure}, {
          where: { UserId:req.session.userid }
        });
        const [results, metadata] = await sequelize.query(
          ' SELECT * FROM cours JOIN creneaux ON creneaux.id = cours."CreneauxId" JOIN eleve ON eleve.id = cours."EleveId" JOIN enseignant ON enseignant.id = cours."EnseignantId" '
        );
        res.render('cours',{logged:req.session.role, userid: req.session.userid, cours1: results});
      
      }
      else {
        const [results, metadata] = await sequelize.query(
          ' SELECT * FROM cours JOIN creneaux ON creneaux.id = cours."CreneauxId" JOIN eleve ON eleve.id = cours."EleveId" JOIN enseignant ON enseignant.id = cours."EnseignantId" '
        );
        res.render('cours',{logged:req.session.role, userid: req.session.userid,message:"vous n'avez pas assez d'heures de cours disponible", cours1: results});
      }
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
  
});
module.exports = router;
