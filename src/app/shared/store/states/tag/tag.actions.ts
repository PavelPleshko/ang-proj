import { Action } from '@ngrx/store';

import {
 TagsTable,TagCommon
} from './tag.interface';



export const LOAD_TAGS = '[Posts main page] Load tags';
export class LoadTags implements Action {
  readonly type = LOAD_TAGS;

  constructor(){}
}

export const LOAD_TAGS_SUCCESS = '[Api load tags response] Load tags success';
export class LoadTagsSuccess implements Action {
  readonly type = LOAD_TAGS_SUCCESS;

  constructor(public payload: TagsTable) {}
}

export const LOAD_TAGS_FAIL = '[Api load TAGS response] Load tags fail';
export class LoadTagsFail implements Action {
  readonly type = LOAD_TAGS_FAIL;

  constructor(public error) {}
}


export const ADD_TAG = '[Admin quick create modal] Add tag';
export class AddTag implements Action {
  readonly type = ADD_TAG;

  constructor(public payload) {}
}

export const  ADD_TAG_SUCCESS= '[Api admin panel] Add tag success';
export class AddTagSuccess implements Action {
  readonly type = ADD_TAG_SUCCESS;

  constructor(public payload) {}
}

export const ADD_TAG_FAIL = '[Api admin panel] Add tag fail';
export class AddTagFail implements Action {
  readonly type = ADD_TAG_FAIL;

  constructor(public error) {}
}


export const REMOVE_TAG = '[Admin panel] Remove tag';
export class RemoveTag implements Action {
  readonly type = REMOVE_TAG;

  constructor(public payload) {}
}

export const  REMOVE_TAG_SUCCESS= '[Api admin panel] Remove tag success';
export class RemoveTagSuccess implements Action {
  readonly type = REMOVE_TAG_SUCCESS;

  constructor(public payload) {}
}

export const REMOVE_TAG_FAIL = '[Api admin panel] Remove tag fail';
export class RemoveTagFail implements Action {
  readonly type = REMOVE_TAG_FAIL;

  constructor(public error) {}
}




export const  EDIT_TAG= '[Admin panel] Edit tag';
export class EditTag implements Action {
  readonly type = EDIT_TAG;

  constructor(public payload) {}
}

export const  EDIT_TAG_SUCCESS= '[Api admin panel] Edit tag success';
export class EditTagSuccess implements Action {
  readonly type = EDIT_TAG_SUCCESS;

  constructor(public payload) {}
}

export const  EDIT_TAG_FAIL= '[Api admin panel] Edit tag fail';
export class EditTagFail implements Action {
  readonly type = EDIT_TAG_FAIL;

  constructor(public payload) {}
}


export const  ADD_TO_POST_LIST= '[Tag posts length update] Add to post list';
export class AddToPostList implements Action {
  readonly type = ADD_TO_POST_LIST;

  constructor(public payload) {}
}






export type All = LoadTags | LoadTagsSuccess | LoadTagsFail 
| AddTag | AddTagFail | AddTagSuccess |AddToPostList| EditTag | EditTagSuccess
|EditTagFail | RemoveTag | RemoveTagSuccess | RemoveTagFail;