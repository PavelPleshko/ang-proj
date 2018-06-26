'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const ObjectId = mongoose.Types.ObjectId;
const recordHelper = require('../helpers/library');

module.exports.getAllTags = function(req,res,next){
		Tag.find({}).populate('posts','_id').exec(function(err,tags){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			res.status(200).json(tags);
		}
	})
} 




module.exports.createTag = function(req,res,next){
	var data=req.body;	
	console.log(data);
	data.author = req.user.id;
	
	Tag.create(data,function(err,tag){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			res.status(200).json(tag);
		}
	})
} 


module.exports.isAllowed = function(req,res,next){
  var title = req.params.tagTitle;
  console.log(title);
  Tag.findOne({title:title},function(err,found){
    if(err){
      console.log(err);
    }else{
     if(found == null){
      res.status(200).json({status:200,exists:false})
     }else{
      res.status(400).json({status:400,exists:true});
     }
    }
  })
}







module.exports.getPostsByTag = function(req,res,next){
	var id = req.params.id;
	
	Tag.find({id:id})
	.populate(recordHelper.population('posts'))
	.exec(function(err,tags){
		if(err){
			console.log(err);
		}else{
			res.json(tags);
		}
	})
}







module.exports.getById = function(req, res, next,id) {
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }

Tag.findById(id,function(err,tag){
  if(err){
    next(err);
  }else if(tag){
   req.tag = tag;
  next();
  }else{
    next(new Error('Failed to find tag'));
  }

})
};