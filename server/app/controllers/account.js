
'Use Strict';

var passport = require('passport');
var _ = require('lodash');
var User = require('../models/user');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');




module.exports.singinLocal = function(req,res,next){
   console.log('Local auth');
   passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      return res.status(404).send({ message: 'Invalid username or password.' });
    }

    Token.generate({
      user: user.id
    }, function(err, token){
     
      if (err || !token) {
        return res.status(404).send({ message: 'Invalid username or password.' });
      }
var result = user.toJSON();
      result.token = _.pick(token, ['hash', 'expiresAt']);
     res.status(200).json(result);
    });
  })(req, res, next);
}


module.exports.signinBearer = function(req,res,next){
  console.log('Bearer auth');
      Token.generate({
      user: req.user.id
    }, function(err, token){
      if (err || !token) {
        return res.status(404).send({ message: 'Invalid email or password.' });
      }
var result = req.user.toJSON();
      result.token = _.pick(token, ['hash', 'expiresAt']);
      res.status(200).json(result);
    });
}



module.exports.getAuthUser = function getAuthUser(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized.' });
  }

  res.json(req.user);
}

module.exports.register = function(req,res,next){
var userData = _.pick(req.body,'username','gender','age','email','password');
 console.log(userData);
User.register(userData,function(err,user){

    if (err && (11000 === err.code || 11001 === err.code)) {
        return res.status(400).json({ message: 'Username is already in use.' });
      }
      if (err) {
        return next(err);
      }
      delete user.password;
      delete user.passwordSalt;

      res.json(user);
})
};


module.exports.isAllowed = function(req,res,next){
  var username = req.body.username;
  User.findOne({username:username},function(err,found){
    if(err){
      console.log(err);
    }else{
     if(found == null){
      res.status(200).json({status:200,exists:false})
     }else{
      res.status(400).json({status:400,exists:true,message:"Username already exists."});
     }
    }
  })
}


module.exports.logout = function(req,res,next){
  console.log(req.user);
  req.logout();
  res.json({message:'Logged out successfully',success:true});

}