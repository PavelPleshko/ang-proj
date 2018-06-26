import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions,ofType} from '@ngrx/effects';
import {Subscription} from 'rxjs';
import {combineLatest} from 'rxjs/observable/combineLatest';

import {PostService} from '../../services/post.service';
import {AuthService} from '../../../auth/services/auth.service';
import {Post} from '../../../datatypes/post';
import {Tag} from '../../../datatypes/tag';
import {Category} from '../../../datatypes/category';
import {AlertService,MessageAlert} from '../../../shared/services/alert.service';
//actions
import * as categoryActions from '../../../shared/store/states/category/category.actions';
import * as postActions from '../../../shared/store/states/post/post.actions';
import * as tagActions from '../../../shared/store/states/tag/tag.actions';
//selectors
import {getCategoriesArray} from '../../../shared/store/states/category/category.selector';
import {getPostsArray,getPostsTotal,getPostsFilters} from '../../../shared/store/states/post/post.selector';
import {getTagsArray} from '../../../shared/store/states/tag/tag.selector';
//helper funcs
import {removeEmpty} from '../../../shared/helpers/functions';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit,OnDestroy {
posts:Post[];
categories:Category[];
tags:Tag[];
currentUser;
filteredPosts;
filteredCategories;
categoriesCollapsed:boolean=true;
state:string='newest';
currentFilterRaw:object;
currentFilterTransformed:object;
alertMessage:MessageAlert;
subs:Subscription[]=[];
loaded:boolean = false;

postStates:any = [
{
	title:'newest',
	value:'newest',
	icon:'far fa-clock'
},{
	title:'popular',
	value:'popular',
	icon:'far fa-star'
},{
	title:'best',
	value:'best',
	icon:'far fa-heart'
}
];
//for pagination
totalResults:number;
totalPages:number = 1;
pageSize:number = 10;
currentPage:number = 0;
limit:number = 10;

  constructor(private postService:PostService,
  	private authService:AuthService,private alertService:AlertService,
  	private cdr:ChangeDetectorRef,private store$:Store<any>,private updates$:Actions) { }

  ngOnInit() {
  	this.store$.dispatch(new categoryActions.LoadCategories());
  	this.store$.dispatch(new tagActions.LoadTags());
  	let catSub = this.store$.select(getCategoriesArray).subscribe(
  		(categories)=>{
  			this.categories = categories.slice();
  		});
  	let tagSub = this.store$.select(getTagsArray).subscribe(
  		(tags)=>{
  			this.tags = tags.slice();
  		});
  	let postsSub = 
  		combineLatest(
  			this.store$.select(getPostsArray),
  			this.store$.select(getPostsTotal),
  			this.store$.select(getPostsFilters)).subscribe((results:any)=>{
  		if(results){
  			this.posts = results[0].slice();
  			this.filteredPosts= this.posts.slice();
  			this.totalResults = results[1];
  			this.currentFilterRaw = results[2].raw;
  			this.currentFilterTransformed = results[2].transformed;
  			this.calculateTotalPages(this.totalResults,this.pageSize);
  			console.log(results);
  		}
  	});

  		let actionSub = this.updates$.pipe(ofType(
  			postActions.DISLIKE_POST_SUCCESS,
  			postActions.LIKE_POST_SUCCESS,
  			postActions.STAR_POST_SUCCESS)).subscribe((result:any)=>{
  			let titlesMap = {
			likes:'You liked the post',
			dislikes:'You disliked the post',
			stars:'Added to bookmarks'
		};
  			let msg:MessageAlert = {
			useExternal:false,
			title:titlesMap[result.payload.type],
			body:'',
			type:'success',
			attr:result.payload.type,
			elementId:result.payload.postId
		};
		this.alertService.pushMessage(msg);
  		})

  	this.subs.push(catSub,postsSub,tagSub,actionSub);
  	this.currentUser = this.authService.currentUser;
  	this.alertService.message$.subscribe((msg)=>{
  		this.alertMessage = msg;
  	});
  }

getPosts(opts:any){
	this.state = opts.type;
	this.store$.dispatch(new postActions.LoadPosts(opts));
}

doPostAction(action){
	let actionType = action.type;
	switch (actionType) {
		case "likes":
			this.store$.dispatch(new postActions.LikePost({targetId:action.postId,type:actionType}))
			break;
		case "dislikes":
			this.store$.dispatch(new postActions.DislikePost({targetId:action.postId,type:actionType}))
			break;
		case "stars":
			this.store$.dispatch(new postActions.StarPost({targetId:action.postId,type:actionType}))
			break;	
	}
}


sortPostsByCategory(category){
	let categoryId = category.id;
	this.store$.dispatch(new postActions.SetFilterObject({
		raw:{
		...this.currentFilterRaw,
		category:[categoryId]
		},
		transformed:{
			...this.currentFilterTransformed,
			category:[category.title]
		}
	}));
	this.store$.dispatch(new postActions.GetFilteredPosts({category:[categoryId]}));
}

filterPostsBy(searchObj:any){
	searchObj = removeEmpty(searchObj);
	searchObj.skip = (this.currentPage-1)*this.pageSize;
	searchObj.limit = this.pageSize;
	this.store$.dispatch(new postActions.GetFilteredPosts(searchObj));

	let transformedFilters = this.transformFilters(searchObj);
	this.store$.dispatch(new postActions.SetFilterObject({raw:searchObj,transformed:transformedFilters}));
}

transformFilters(filters){
	let o = Object.assign({},filters);
	if(o.category){
		o.category = this.categories.map((cat:any)=>{
		if(o.category.includes(cat.id)){
			return cat.title;
		}
	}).filter((val)=>!!(val));
	};

	if(o.tags){
		o.tags = this.tags.map((tag:any)=>{
		if(o.tags.includes(tag.id)){
			return tag.title;
		}
	}).filter((val)=>!!(val));
	};
	
	return o;
}

filterRemoved(filterId:string){
	this.store$.dispatch(new postActions.RemoveFilter(filterId));
	this.filterPostsBy(this.currentFilterRaw);
}

changeCurrentPage(pageNum){
		this.currentPage = pageNum;
		let opts = {
		pageNumber:this.currentPage,
		limit:this.limit,
		skip:this.pageSize*(this.currentPage-1),
		type:this.state
		};
		this.getPosts(opts);
}

calculateTotalPages(totalResults:number,perPage:number):void{
	this.totalPages = Math.ceil(totalResults/perPage);
}

ngOnDestroy(){
	this.subs.forEach((sub)=>{
		sub.unsubscribe();
	})
}
}
