import {createSelector,createFeatureSelector} from '@ngrx/store';
import {PostsTable,PostsState,PostsArray} from './post.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';




export const getAllPostsState = createFeatureSelector<PostsState>('posts');

export const getAllPosts = createSelector(getAllPostsState,(state:PostsState)=>state.data);

export const getPostsArray = createSelector(getAllPosts,(state:PostsTable)=>{
	const posts = state.allIds.map(postId=>{
		let post = state.byId[postId];
		return post;
	})
	return posts;
});

export const getPostsTotal = createSelector(getAllPostsState,(state:PostsState)=>{
	return state.data.total;
})

export const getPostsFilters = createSelector(getAllPostsState,(state:PostsState)=>{
	
	return state.data.filters;
})

export const getOrdersLoaded = createSelector(getAllPostsState,(state:PostsState)=>{
	return state.loaded;
})

export const getOrdersLoading = createSelector(getAllPostsState,(state:PostsState)=>{
	return state.loading;
})


