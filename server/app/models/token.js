'use strict';

const EXPIRATION = 5; // in days
const LEN = 32;

const mongoose = require('mongoose');
const tokenHelper = require('../helpers/token');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const jwt = require('jsonwebtoken');

const TokenSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  hash: {
    type: String,
  },
  expiresAt: {
    type: Date,
    default: function() {
      var now = new Date();
      now.setDate(now.getDate() + EXPIRATION);

      return now;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


TokenSchema.statics.generate = generateToken


function generateToken(opts, callback) {
var self = this;

  jwt.sign(opts,'secretkeycake',{},function(err,token){
    if(err){
      console.log(err);
    }else{
      let tokenObj = {
        user:opts.user,
        hash:token
      }

           self.model('Token').create(tokenObj, callback);
    }
   })
   

};

// compile Token model
module.exports = mongoose.model('Token', TokenSchema);