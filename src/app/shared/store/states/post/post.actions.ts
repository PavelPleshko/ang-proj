import { Action } from '@ngrx/store';

import {
 PostsTable,PostCommon
} from './post.interface';



export const LOAD_POSTS = '[Posts] Load posts';
export class LoadPosts implements Action {
  readonly type = LOAD_POSTS;

  constructor(public payload:string){}
}

export const LOAD_POSTS_SUCCESS = '[Posts] Load posts success';
export class LoadPostsSuccess implements Action {
  readonly type = LOAD_POSTS_SUCCESS;

  constructor(public payload: PostsTable) {}
}

export const LOAD_POSTS_FAIL = '[Posts] Load posts fail';
export class LoadPostsFail implements Action {
  readonly type = LOAD_POSTS_FAIL;

  constructor(public error) {}
}


export const ADD_POST = '[Posts] Add post';
export class AddPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload) {}
}

export const  ADD_POST_SUCCESS= '[Posts] Add post success';
export class AddPostSuccess implements Action {
  readonly type = ADD_POST_SUCCESS;

  constructor(public payload) {}
}

export const ADD_POST_FAIL = '[Posts] Add post fail';
export class AddPostFail implements Action {
  readonly type = ADD_POST_FAIL;

  constructor(public error) {}
}


export const REMOVE_POST = '[Posts] Remove post';
export class RemovePost implements Action {
  readonly type = REMOVE_POST;

  constructor(public payload) {}
}

export const  REMOVE_POST_SUCCESS= '[Posts] Remove post success';
export class RemovePostSuccess implements Action {
  readonly type = REMOVE_POST_SUCCESS;

  constructor(public payload) {}
}

export const REMOVE_POST_FAIL = '[Posts] Remove post fail';
export class RemovePostFail implements Action {
  readonly type = REMOVE_POST_FAIL;

  constructor(public error) {}
}




export const  EDIT_POST= '[Posts] Edit post';
export class EditPost implements Action {
  readonly type = EDIT_POST;

  constructor(public payload) {}
}

export const  EDIT_POST_SUCCESS= '[Posts] Edit post success';
export class EditPostSuccess implements Action {
  readonly type = EDIT_POST_SUCCESS;

  constructor(public payload) {}
}

export const  EDIT_POST_FAIL= '[Posts] Edit post fail';
export class EditPostFail implements Action {
  readonly type = EDIT_POST_FAIL;

  constructor(public payload) {}
}

export const  LIKE_POST= '[Post tile single] Like post';
export class LikePost implements Action {
  readonly type = LIKE_POST;

  constructor(public payload) {}
}

export const  LIKE_POST_SUCCESS= '[Api response like post] Like post';
export class LikePostSuccess implements Action {
  readonly type = LIKE_POST_SUCCESS;

  constructor(public payload) {}
}


export const  LIKE_POST_FAIL= '[Api response like post] Like post';
export class LikePostFail implements Action {
  readonly type = LIKE_POST_FAIL;
  constructor(public payload) {}
}



export const  DISLIKE_POST= '[Post tile single] dislike post';
export class DislikePost implements Action {
  readonly type = DISLIKE_POST;

  constructor(public payload) {}
}

export const  DISLIKE_POST_SUCCESS= '[Api response like post] dislike post';
export class DislikePostSuccess implements Action {
  readonly type = DISLIKE_POST_SUCCESS;

  constructor(public payload) {}
}


export const  DISLIKE_POST_FAIL= '[Api response like post] dislike post';
export class DislikePostFail implements Action {
  readonly type = DISLIKE_POST_FAIL;
  constructor(public payload) {}
}


export const  STAR_POST= '[Post tile single] star post';
export class StarPost implements Action {
  readonly type = STAR_POST;

  constructor(public payload) {}
}

export const  STAR_POST_SUCCESS= '[Api response star post] star post';
export class StarPostSuccess implements Action {
  readonly type = STAR_POST_SUCCESS;

  constructor(public payload) {}
}


export const  STAR_POST_FAIL= '[Api response star post] star post';
export class StarPostFail implements Action {
  readonly type = STAR_POST_FAIL;
  constructor(public payload) {}
}

export const  GET_FILTERED_BY_CATEGORY= '[Posts main filter by] filter posts by category';
export class GetFilteredByCategory implements Action {
  readonly type = GET_FILTERED_BY_CATEGORY;

  constructor(public payload) {}
}

export const  GET_FILTERED_BY_CATEGORY_SUCCESS= '[Api response filter by] filter posts by category';
export class GetFilteredByCategorySuccess implements Action {
  readonly type = GET_FILTERED_BY_CATEGORY_SUCCESS;

  constructor(public payload) {}
}

export const  GET_FILTERED_BY_CATEGORY_FAIL= '[Api response filter by] filter posts by category';
export class GetFilteredByCategoryFail implements Action {
  readonly type = GET_FILTERED_BY_CATEGORY_FAIL;

  constructor(public payload) {}
}


export const  GET_FILTERED_POSTS= '[Posts advanced search] filter posts';
export class GetFilteredPosts implements Action {
  readonly type = GET_FILTERED_POSTS;

  constructor(public payload) {}
}

export const  GET_FILTERED_POSTS_SUCCESS= '[Api response advanced search] filter posts';
export class GetFilteredPostsSuccess implements Action {
  readonly type = GET_FILTERED_POSTS_SUCCESS;

  constructor(public payload) {}
}

export const  GET_FILTERED_POSTS_FAIL= '[Api response advanced search] filter posts';
export class GetFilteredPostsFail implements Action {
  readonly type = GET_FILTERED_POSTS_FAIL;

  constructor(public payload) {}
}

export const  SET_POSTS_TOTAL= '[Main posts page] posts total amount';
export class SetPostsTotal implements Action {
  readonly type = SET_POSTS_TOTAL;

  constructor(public payload) {}
}


export const  SET_FILTER_OBJECT= '[Advanced search component] filter object opts';
export class SetFilterObject implements Action {
  readonly type = SET_FILTER_OBJECT;

  constructor(public payload) {}
}

export const  REMOVE_FILTER= '[App filter component event] remove one filter';
export class RemoveFilter implements Action {
  readonly type = REMOVE_FILTER;

  constructor(public payload) {}
}





export type All = LoadPosts | LoadPostsSuccess | LoadPostsFail 
| AddPost | AddPostSuccess | AddPostFail | EditPost | EditPostSuccess
|EditPostFail | RemovePost | RemovePostSuccess | RemovePostFail
|LikePost | LikePostSuccess | LikePostFail | DislikePost | DislikePostSuccess | DislikePostFail |
StarPost | StarPostSuccess | StarPostFail | GetFilteredByCategory 
| GetFilteredByCategorySuccess | GetFilteredByCategoryFail | GetFilteredPosts | GetFilteredPostsSuccess |
GetFilteredPostsFail | SetPostsTotal | SetFilterObject | RemoveFilter;