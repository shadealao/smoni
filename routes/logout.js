var express = require('express');
var router = express.Router();
const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
/* GET login listing. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.redirect('login');
  
});

module.exports = router;
