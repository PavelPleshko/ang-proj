'use strict';

const _ = require('lodash');
const passport = require('passport');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const ObjectId = mongoose.Types.ObjectId;


const recordHelper = require('../helpers/library');
const dbQueries = require('../db-queries/posts');

module.exports.createPost = function(req,res,next){
	var data=req.body;	
	console.log(data);
	data.author = req.user.id;
	
	Post.create(data,function(err,post){
		if(err){
			console.log(err);
			res.status(400).json(err);
		}else{
			Post.findOne({_id:post._id}).populate([{path:'category',select:'title'},{
				path:'author',
				select:'username'
			},{
				path:'tags',
				select:'title'
			}]).exec(function(err,populatedPost){
				
				res.status(200).json(populatedPost);
			})

			
		}
	})
} 

module.exports.likePost=function(req,res,next){
var postId = req.params.postId;
Post.findById(postId,function(err,post){
var idx = post.likes.findIndex(function(id){
	return id == req.user._id.toString();
})

if(idx<0){
	post.likes.push(req.user._id);
	post.save(function(err,savedPost){
		if(err){
			res.json(err);
		}else{
			Post.findOne({_id:savedPost._id}).populate([{path:'category',select:'title'},{
				path:'author',
				select:'username'
			},{
				path:'tags',
				select:'title'
			}])
			.exec(function(err,populatedPost){
				res.status(200).json(populatedPost);
			})		
		}	
		
		
})
}else{
	res.json({message:'You have already liked this post.This can do only once per post.'})
}
})
}

module.exports.dislikePost=function(req,res,next){
var postId = req.params.postId;
Post.findById(postId,function(err,post){
var idx = post.dislikes.findIndex(function(id){
	return id == req.user._id.toString();
})

if(idx<0){
	post.dislikes.push(req.user._id);
	post.save(function(err,savedPost){
		if(err){
			res.json(err);
		}else{
			Post.findOne({_id:savedPost._id}).populate([{path:'category',select:'title'},{
				path:'author',
				select:'username'
			},{
				path:'tags',
				select:'title'
			}])
			.exec(function(err,populatedPost){
				res.status(200).json(populatedPost);
			})		
		}	
		
})
}else{
	res.json({message:'You have already disliked this post.This can do only once per post.'})
}
})
}

module.exports.starPost = function(req,res,next){
	var postId = req.params.postId;
Post.findById(postId,function(err,post){
var idx = post.stars.findIndex(function(id){
	return id == req.user._id.toString();
})

if(idx<0){
	post.stars.push(req.user._id);
	post.save(function(err,savedPost){
		if(err){
			res.json(err);
		}else{
			Post.findOne({_id:savedPost._id}).populate([{path:'category',select:'title'},{
				path:'author',
				select:'username'
			},{
				path:'tags',
				select:'title'
			}])
			.exec(function(err,populatedPost){
				res.status(200).json(populatedPost);
			})
				
		}	
		
})
}else{
	res.json({message:'You have already added this post to bookmarks.This can do only once per post.'})
}
})
}


module.exports.getAuthorizedUserPosts = function(req,res,next){
	var id;
if(req.params.userId){
	id = req.params.userId;
}else{
	id = req.user.id;
}
	
	Post.find({author:id})
	.populate(recordHelper.population('comments'))
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else{
			res.json(posts);
		}
	})
}

module.exports.getAllPosts = function(req,res,next){
	var query = req.query;
	var limit = Number(query.limit) || 15;
	var skip = Number(query.skip) || 0;
	var pageNumber = query.pageNumber || 0;
	console.log(query,typeof query.limit);
	switch(query.type){
		case 'newest':
			getNewestPosts(req,res,limit,skip,pageNumber);
			break;
		case 'popular':
			getPopularPosts(req,res,limit,skip,pageNumber);
			break;
		case 'best':
			getBestPosts(req,res,limit,skip,pageNumber);
			break;
	}
}

function getNewestPosts(req,res,limit,skip,pageNumber){
	

	Post.aggregate([
		...dbQueries.getGroupedPostsWithTotal,
		...dbQueries.getSortSkipLimitQuery(skip,limit,'postedOn'),
		...dbQueries.populateFieldsQuery,
		...dbQueries.defaultProjectQuery,
		...dbQueries.outputGroupedQuery	
		])
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else if(posts && posts.length){
			posts[0].data = posts[0].data.map(function(post){
				return {...post,author:post.author[0],category:post.category[0]}
			});
			res.status(200).json(posts);
		}
	})
}

function getPopularPosts(req,res,limit,skip,pageNumber){

	Post.aggregate([
		...dbQueries.getGroupedPostsWithTotal,
		...dbQueries.getSortSkipLimitQuery(skip,limit,'stars'),
		...dbQueries.populateFieldsQuery,
		...dbQueries.defaultProjectQuery,
		...dbQueries.outputGroupedQuery	
		])
	//.populate(recordHelper.population('comments'))
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else if(posts && posts.length){
			posts[0].data = posts[0].data.map(function(post){
				return {...post,author:post.author[0],category:post.category[0]}
			});
			res.status(200).json(posts);
		}
	})
}


function getBestPosts(req,res,limit,skip,pageNumber){

	Post.aggregate([
		...dbQueries.getGroupedPostsWithTotal,
		...dbQueries.getSortSkipLimitQuery(skip,limit,'likes'),
		...dbQueries.populateFieldsQuery,
		...dbQueries.defaultProjectQuery,
		...dbQueries.outputGroupedQuery	
		])
	//.populate(recordHelper.population('comments'))
	.exec(function(err,posts){
		if(err){
			console.log(err);
		}else if(posts && posts.length){
			posts[0].data = posts[0].data.map(function(post){
				return {...post,author:post.author[0],category:post.category[0]}
			});
			res.status(200).json(posts);
		}
	})
}


module.exports.filterPostsBy = function(req,res,next){
	var query = req.body;
	var strictOperator = '$and';
	var order = query.order || -1;
	var limit = query.limit || 10;
	var skip = query.skip || 0;
	query.category = convertStringsToObjIds(query.category);
	query.tags = convertStringsToObjIds(query.tags);
	console.log(query);
	var match ={[strictOperator]:[
		{category:query.category ? {$in:query.category} : {$exists:true}},
		{tags:query.tags ? {$all:query.tags} : {$exists:true}},
		{postedOn:(query.postedFrom && query.postedTo) ? 
			{
			$lte:query.postedTo ? new Date(query.postedTo) : new Date(),
		    $gte:query.postedFrom ? new Date(query.postedFrom) : null
			} : {$exists:true}
		},
		{revealAuthor:query.revealAuthor ? query.revealAuthor : {$exists:true}}		
		]
		};

	Post.aggregate([
		{$match:match},
		...dbQueries.getGroupedPostsWithTotal,
		...dbQueries.getSortSkipLimitQuery(skip,limit,'postedOn'),
		...dbQueries.populateFieldsQuery,
		...dbQueries.defaultProjectQuery,
		...dbQueries.outputGroupedQuery	
		]).exec(function(err,posts){
			if(err){
				console.log(err);
			}else if(posts && posts.length){
			posts[0].data = posts[0].data.map(function(post){
				return {...post,author:post.author[0],category:post.category[0]}
			});
		}
			res.status(200).json(posts);
		})
}


function convertStringsToObjIds(data){
	if(typeof data == 'string'){
		data = mongoose.Types.ObjectId(data);
	}else if(typeof data == 'object' && data.length && data.length > 0){
		data = [].map.call(data,function(el){
			return mongoose.Types.ObjectId(el);
		})
	}
	return data;
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


