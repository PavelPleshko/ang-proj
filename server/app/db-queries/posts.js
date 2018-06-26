'use strict';

const getGroupedPostsWithTotal = [
{$group:{_id:null,data:{$push:"$$ROOT"},total:{$sum:1}}},		
{$unwind:"$data"}
];

function defaultSortSkipLimitQuery(skip,limit,sortBy){

	return [
		{$sort:{['data.'+sortBy]:-1}},
		{$skip:skip},
		{$limit:limit}
	]
}

const populateFieldsQuery = [
		{$lookup:{
			from:'users',localField:'data.author',foreignField:'_id',as:'data.author'
		 }},
		 {$lookup:{
			from:'tags',localField:'data.tags',foreignField:'_id',as:'data.tags'
		}},
		{$lookup:{
			from:'categories',localField:'data.category',foreignField:'_id',as:'data.category'
		}}
];

const defaultProjectQuery = [
	{$project:{	
			"_id":0,	
			"data.author.password":0,
			"data.author.passwordSalt":0,
			"data.author.age":0,
			"data.category.createdAt":0,
			"data.category.author":0,
		    "data.tags.createdAt":0,
		}}
];

const outputGroupedQuery = [
	{$group:{
			_id:null,
			total:{$first:'$total'},
			data:{
		    $push:'$data'	
		    }}}
];

module.exports.getGroupedPostsWithTotal = getGroupedPostsWithTotal;
module.exports.getSortSkipLimitQuery = defaultSortSkipLimitQuery;
module.exports.populateFieldsQuery = populateFieldsQuery;
module.exports.defaultProjectQuery = defaultProjectQuery;
module.exports.outputGroupedQuery = outputGroupedQuery;
