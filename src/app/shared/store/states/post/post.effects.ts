import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as postActions from './post.actions';
import * as categoryActions from '../category/category.actions';
import {PostService} from '../../../../post/services/post.service';
import {tableHelper} from '../../../helpers/table';
import {Store} from '@ngrx/store';

@Injectable()
export class PostsEffects{

	constructor(public actions$:Actions,public postsService:PostService,
		private store$:Store<any>){}

@Effect()
loadPosts$ = this.actions$.ofType(postActions.LOAD_POSTS).pipe(

	switchMap((criteria:any)=>{
		return this.postsService.getPosts(criteria.payload).pipe(
			map((posts:any)=>{
				posts = posts[0];
				let total = posts.total;
				this.store$.dispatch(new postActions.SetPostsTotal(total));
				posts = tableHelper(posts.data);	
				return new postActions.LoadPostsSuccess(posts);
			}),
			catchError((error) => of(new postActions.LoadPostsFail(error)))
	)}));



@Effect()
addPost$ = this.actions$.ofType(postActions.ADD_POST).pipe(
	switchMap((action)=>{
			let post = action['payload'];
		return this.postsService.sendPost(post).pipe(
			map((newPost)=>{
				let categoryId = newPost.category.id;
				this.store$.dispatch(new categoryActions.AddToPostList({categoryId:categoryId,post:{_id:newPost.id}}))
				return new postActions.AddPostSuccess(newPost);
			}),
			catchError((error)=> {
				return of(new postActions.AddPostFail(error))}))
	})
	)


@Effect()
doPostAction$ = this.actions$.ofType(postActions.LIKE_POST,postActions.DISLIKE_POST,
	postActions.STAR_POST).pipe(
	switchMap((action:any)=>{
			let postId:string = action.payload.targetId;
			let type:string = action.payload.type;
		return this.postsService.doPostAction(type,postId).pipe(
			map((newPost)=>{
				let categoryId = newPost.category.id;
				if(type == 'likes'){
					this.store$.dispatch(new postActions.LikePostSuccess({type:type,postId:postId}));
				}else if(type == 'dislikes'){
					this.store$.dispatch(new postActions.DislikePostSuccess({type:type,postId:postId}));
				}
				else if(type == 'stars'){
					this.store$.dispatch(new postActions.StarPostSuccess({type:type,postId:postId}));
				}
				return new postActions.EditPostSuccess(newPost);
			}),
			catchError((error)=> {
				return of(new postActions.EditPostFail(error))}))
	})
	)

@Effect()
getFilteredPosts$ = this.actions$.ofType(postActions.GET_FILTERED_POSTS).pipe(
	switchMap((action)=>{
			let filterObj = action['payload'];
		return this.postsService.getFilteredPosts(filterObj).pipe(
			map((posts)=>{
				posts = posts[0];
				let total = posts.total;
				this.store$.dispatch(new postActions.SetPostsTotal(total));
				posts = tableHelper(posts.data);	
				return new postActions.GetFilteredPostsSuccess(posts);
			}),
			catchError((error)=> {
				return of(new postActions.GetFilteredPostsFail(error))}))
	})
	)
}