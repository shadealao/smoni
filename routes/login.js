var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login');
  
});

router.post('/',  async(req, res, next) =>{
  console.log(req.body);
  const user = await User.findOne({ where : {email : req.body.email }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.mdp,user.password);
    if(password_valid){
      //token = jwt.sign({ "id" : user.id,"email" : user.email,"first_name":user.first_name },process.env.SECRET);
      token = jwt.sign({ "id" : user.id,"email" : user.email },"mdp");
      //token = jwt.sign({"email" : "aa" },process.env.SECRET);
      console.log("req.sess ==> "+JSON.stringify(req.session, null, 4) )
      sess = req.session;
      sess.email= user.email;
      sess.userid= user.id;
      sess.role= user.role;
      sess.cart= [];  
      sess.autre= token;
      console.log("sess ==> "+JSON.stringify(sess, null, 4) )
      res.redirect('.');
      
      //res.status(200).json({ token : token });
      //res.render('index');
    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
    
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
  
});
module.exports = router;
