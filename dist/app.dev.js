"use strict";

var createError = require('http-errors');

var bodyParser = require("body-parser");

var express = require('express');

var path = require('path');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');

var loginRouter = require("./routes/login");

var logoutRouter = require("./routes/logout");

var registerRouter = require("./routes/register");

var produitRouter = require("./routes/produit");

var creneauxRouter = require("./routes/creneaux");

var eleveRouter = require("./routes/eleve");

var enseignantRouter = require("./routes/enseignant");

var app = express(); // view engine setup

app.set('views', path.join(__dirname, 'views'));

var session = require('express-session');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'mdp',
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  resave: true
}));
app.set('view engine', 'jade');
var sess;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/produit', produitRouter);
app.use('/creneaux', creneauxRouter);
app.use('/eleve', eleveRouter);
app.use('/enseignant', enseignantRouter); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

var _require = require('./models'),
    sequelize = _require.sequelize,
    User = _require.User,
    Eleve = _require.Eleve,
    Enseignant = _require.Enseignant,
    Produit = _require.Produit,
    Creneaux = _require.Creneaux; // import models


User.hasOne(Eleve);
User.hasOne(Enseignant); //const {User} = require('./models'); // import models
//const db = require("./models");
//sequelize.sync()

sequelize.sync({
  alter: true
}).then(function () {
  console.log("Synced db.");
})["catch"](function (err) {
  console.log("Failed to sync db: " + err.message);
}); // This will run .sync() only if database name ends with '_test'
//sequelize.sync();

/**
 * In development, you may need to drop
 * existing tables and re-sync database. Just use force: true as following code:
 * 
 * db.sequelize.sync({ force: true }).then(() => {
 *  console.log("Drop and re-sync db.");
 * });
 */
// error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
app.get("/", function (req, res, next) {
  try {
    var token = req.headers['authorization'].split(" ")[1];
    var decoded = jwt.verify(token, "mdp");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      "msg": "Couldnt Authenticate"
    });
  }
}, function (req, res, next) {
  var user = User.findOne({
    where: {
      id: req.user.id
    },
    attributes: {
      exclude: ["password"]
    }
  });

  if (user === null) {
    res.status(404).json({
      'msg': "User not found"
    });
  }

  res.status(200).json(user);
});
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/

module.exports = app;