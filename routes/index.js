var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
  
  
  //console.log("sess ==> "+JSON.stringify(req.session.email, null, 4) )
  if(req.session.email != undefined){
    sess= req.session;
    sess.lastError = sess.erreur;
    sess.erreur=undefined;
    console.log("sess ==> "+JSON.stringify(sess, null, 4) )
    
    res.render('layout',{logged:req.session.role,MessageErr:sess.lastError,user:sess.email});
  }else
    res.render('layout',{logged:'non'});
});
    /*try {
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
   */



module.exports = router;
