var createError = require('http-errors');
const bodyParser = require("body-parser");
var express = require('express');
var path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


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
var coursRouter = require("./routes/cours");
var app = express(); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'mdp',saveUninitialized: true, cookie: { maxAge: 1000 * 60 * 60 * 24 }, resave: true}));

app.set('view engine', 'jade');


var sess;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/produit', produitRouter);
app.use('/creneaux', creneauxRouter);
app.use('/eleve', eleveRouter);
app.use('/enseignant', enseignantRouter);
app.use('/cours', coursRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



const {sequelize, User, Eleve, Enseignant, Produit, Creneaux, Cours} = require('./models'); // import models
User.hasOne(Eleve);
User.hasOne(Enseignant);
Eleve.hasOne(Cours);
Enseignant.hasOne(Cours);
Creneaux.hasOne(Cours);
//const {User} = require('./models'); // import models
//const db = require("./models");
//sequelize.sync()
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
  // This will run .sync() only if database name ends with '_test'
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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("/", function(req,res,next){
  try {
    let token = req.headers['authorization'].split(" ")[1];
    let decoded = jwt.verify(token,"mdp");
    req.user = decoded;
    next();
  } catch(err){
    res.status(401).json({"msg":"Couldnt Authenticate"});
  }
  },
  function(req,res,next){
    let user =  User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
    if(user === null){
      res.status(404).json({'msg':"User not found"});
    }
    res.status(200).json(user);
 }); 
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/

module.exports = app;