"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../models'),
    sequelize = _require.sequelize,
    User = _require.User,
    Eleve = _require.Eleve,
    Enseignant = _require.Enseignant,
    Produit = _require.Produit,
    Creneaux = _require.Creneaux; // import models


var bcrypt = require('bcrypt');

router.get('/', function _callee(req, res, next) {
  var produits;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.session.role != undefined)) {
            _context.next = 12;
            break;
          }

          if (!(req.session.role === "admin" || req.session.role === "enseignant" || req.session.role === "eleve")) {
            _context.next = 9;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(Produit.findAll());

        case 4:
          produits = _context.sent;
          //console.log("sess ==> "+JSON.stringify(produits, null, 4) )
          cart = "hello";
          res.render('produit', {
            logged: req.session.role,
            userid: req.session.userid,
            produit: produits
          });
          _context.next = 10;
          break;

        case 9:
          res.render('noaccess', {
            message: "Vous n'avez pas les droits d'accès à la page"
          });

        case 10:
          _context.next = 13;
          break;

        case 12:
          res.render('noaccess', {
            message: "Veuillez vous connecter!"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/', function (req, res) {
  if (req.session.role != undefined) {
    if (req.session.role === "admin" || req.session.role === "enseignant") {
      var nom = req.body.nom;
      var prix = req.body.prix;
      var description = req.body.description;
      Produit.create({
        nom: nom,
        prix: prix,
        description: description
      });
      res.redirect('produit');
    } else {
      res.render('noaccess', {
        message: "Vous n'avez pas les droits d'accès à la page"
      });
    }
  } else res.render('noaccess', {
    message: "Veuillez vous connecter!"
  });
});
router.post('/:id', function _callee2(req, res) {
  var nom, prix, description;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.session.role != undefined)) {
            _context2.next = 13;
            break;
          }

          if (!(req.session.role === "admin")) {
            _context2.next = 10;
            break;
          }

          nom = req.body.nom;
          prix = req.body.prix;
          description = req.body.description;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Produit.update({
            nom: nom,
            prix: prix,
            description: description
          }, {
            where: {
              id: req.params.id
            }
          }));

        case 7:
          res.redirect('produit');
          _context2.next = 11;
          break;

        case 10:
          res.render('noaccess', {
            message: "Vous n'avez pas les droits d'accès à la page"
          });

        case 11:
          _context2.next = 14;
          break;

        case 13:
          res.render('noaccess', {
            message: "Veuillez vous connecter!"
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/panier/:id', function _callee3(req, res) {
  var produit, getproduit;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.session.role != undefined)) {
            _context3.next = 14;
            break;
          }

          if (!(req.session.role === "eleve")) {
            _context3.next = 11;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(Produit.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 4:
          produit = _context3.sent;
          getproduit = {
            id: produit.id,
            nom: produit.nom,
            prix: produit.prix
          };
          req.session.cart.push(getproduit);
          cart = req.session.cart; //console.log(req.session.cart)
          //await getarr(produit)
          //cart_occ = await findOcc(cart, "id")
          //console.log(cart_occ)

          res.redirect('/produit');
          _context3.next = 12;
          break;

        case 11:
          res.render('noaccess', {
            message: "Vous n'avez pas les droits d'accès à la page"
          });

        case 12:
          _context3.next = 15;
          break;

        case 14:
          res.render('noaccess', {
            message: "Veuillez vous connecter!"
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.get('/panier', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(req.session.role != undefined)) {
            _context4.next = 15;
            break;
          }

          if (!(req.session.role === "eleve")) {
            _context4.next = 12;
            break;
          }

          cart = req.session.cart;
          _context4.next = 5;
          return regeneratorRuntime.awrap(findOcc(cart, "id"));

        case 5:
          cart_occ = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(findTotal(cart));

        case 8:
          total = _context4.sent;
          //console.log(cart_occ)
          res.render('panier', {
            logged: req.session.role,
            userid: req.session.userid,
            produit: cart_occ,
            total: total
          });
          _context4.next = 13;
          break;

        case 12:
          res.render('noaccess', {
            message: "Vous n'avez pas les droits d'accès à la page"
          });

        case 13:
          _context4.next = 16;
          break;

        case 15:
          res.render('noaccess', {
            message: "Veuillez vous connecter!"
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
});

function findTotal(arr) {
  total = 0;

  for (i = 0; i < arr.length; i++) {
    total += arr[i].prix;
  }

  return total;
}

function findOcc(arr, key) {
  var arr2 = [];
  arr.forEach(function (x) {
    // Checking if there is any object in arr2
    // which contains the key value
    if (arr2.some(function (val) {
      return val[key] == x[key];
    })) {
      // If yes! then increase the occurrence by 1
      arr2.forEach(function (k) {
        if (k[key] === x[key]) {
          k["occurrence"]++;
        }
      });
    } else {
      // If not! Then create a new object initialize 
      // it with the present iteration key's value and 
      // set the occurrence to 1
      var a = {};
      a[key] = x[key];
      a["occurrence"] = 1;
      a["value"] = x;
      arr2.push(a);
    }
  });
  return arr2;
}

module.exports = router;