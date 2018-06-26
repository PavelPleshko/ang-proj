'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const ObjectId = mongoose.Types.ObjectId;
const recordHelper = require('../helpers/library');

module.exports.getAllCategories = function(req,res,next){
	Category.find({}).populate('posts','_id').exec(function(err,categories){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			res.status(200).json(categories);
		}
	})
} 




module.exports.createCategory = function(req,res,next){
	var data=req.body;	
	console.log(data);
	data.author = req.user.id;
	
	Category.create(data,function(err,category){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			Category.findOne({_id:category._id}).populate('posts','_id')
			.exec(function(err,populatedCategory){
				res.status(200).json(populatedCategory);
			});
			
		}
	})
} 


module.exports.isAllowed = function(req,res,next){
  var title = req.params.categoryTitle;
  console.log(title);
  Category.findOne({title:title.toLowerCase()},function(err,found){
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







module.exports.getPostsByCategory = function(req,res,next){
	var id = req.params.id;
	
	Category.find({id:id})
	.populate(recordHelper.population('posts'))
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else{
			res.json(posts);
		}
	})
}







module.exports.getById = function(req, res, next,id) {
   if (!ObjectId.isValid(id)) {
    res.status(404).send({ message: 'Not found.'});
  }

Post.findById(id,function(err,post){
  if(err){
    next(err);
  }else if(post){
   req.post = post;
  next();
  }else{
    next(new Error('Failed to find post'));
  }

})
};