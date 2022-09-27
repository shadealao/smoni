var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models'); // import models
const bcrypt = require('bcrypt');

router.get('/', async(req, res, next)=> {
  
  if(req.session.role != undefined) {
    if((req.session.role === "admin") || (req.session.role === "enseignant") || (req.session.role === "eleve")){
      const produits = await Produit.findAll();
      //console.log("sess ==> "+JSON.stringify(produits, null, 4) )
      
      cart = "hello"
      res.render('produit',{logged:req.session.role, userid: req.session.userid, produit: produits});
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
      const nom= req.body.nom
      const prix = req.body.prix
      const description = req.body.description
      Produit.create({nom,prix,description});
      res.redirect('produit');
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});


router.post('/:id', async(req,res) =>{
  if(req.session.role != undefined) {
    if(req.session.role === "admin"){
      const nom= req.body.nom
      const prix = req.body.prix
      const description = req.body.description
      await Produit.update({nom,prix,description}, {
        where: {
          id: req.params.id
        }
      });
      res.redirect('produit');
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

router.get('/panier/:id', async(req,res) =>{
  if(req.session.role != undefined) {
    if(req.session.role === "eleve"){
      const produit = await Produit.findOne({ where: { id:req.params.id } });
      const getproduit = {
        id:produit.id,
        nom:produit.nom,
        prix:produit.prix
      }
      req.session.cart.push(getproduit)
      cart = req.session.cart
      //console.log(req.session.cart)
      //await getarr(produit)
      //cart_occ = await findOcc(cart, "id")
      //console.log(cart_occ)
      res.redirect('/produit');
    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});


router.get('/panier', async(req,res) =>{
  if(req.session.role != undefined) {
    if(req.session.role === "eleve"){
      cart = req.session.cart
      cart_occ = await findOcc(cart, "id")
      total = await findTotal(cart)
      //console.log(cart_occ)
      res.render('panier',{logged:req.session.role, userid: req.session.userid, produit: cart_occ, total:total});

    }
    else {
      res.render('noaccess',{message: "Vous n'avez pas les droits d'accès à la page"})
    }
  }
  else
    res.render('noaccess',{message: "Veuillez vous connecter!"})
});

function findTotal(arr){
  total = 0
  for(i = 0; i < arr.length; i++){
    total += arr[i].prix
  }
  return total;
}

function findOcc(arr, key){
  let arr2 = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["occurrence"] = 1
       a["value"] = x
       arr2.push(a);
     }
  })
    
  return arr2
}
module.exports = router;
