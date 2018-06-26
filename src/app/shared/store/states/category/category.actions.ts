import { Action } from '@ngrx/store';

import {
 CategoriesTable,CategoryCommon
} from './category.interface';



export const LOAD_CATEGORIES = '[Posts main page] Load categories';
export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;

  constructor(){}
}

export const LOAD_CATEGORIES_SUCCESS = '[Api load categories response] Load categories success';
export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;

  constructor(public payload: CategoriesTable) {}
}

export const LOAD_CATEGORIES_FAIL = '[Api load categories response] Load categories fail';
export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;

  constructor(public error) {}
}


export const ADD_CATEGORY = '[Admin quick create modal] Add category';
export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload) {}
}

export const  ADD_CATEGORY_SUCCESS= '[Posts] Add category success';
export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;

  constructor(public payload) {}
}

export const ADD_CATEGORY_FAIL = '[Posts] Add category fail';
export class AddCategoryFail implements Action {
  readonly type = ADD_CATEGORY_FAIL;

  constructor(public error) {}
}


export const REMOVE_CATEGORY = '[Categories] Remove category';
export class RemoveCategory implements Action {
  readonly type = REMOVE_CATEGORY;

  constructor(public payload) {}
}

export const  REMOVE_CATEGORY_SUCCESS= '[Categories] Remove category success';
export class RemoveCategorySuccess implements Action {
  readonly type = REMOVE_CATEGORY_SUCCESS;

  constructor(public payload) {}
}

export const REMOVE_CATEGORY_FAIL = '[Categories] Remove category fail';
export class RemoveCategoryFail implements Action {
  readonly type = REMOVE_CATEGORY_FAIL;

  constructor(public error) {}
}




export const  EDIT_CATEGORY= '[Categories] Edit category';
export class EditCategory implements Action {
  readonly type = EDIT_CATEGORY;

  constructor(public payload) {}
}

export const  EDIT_CATEGORY_SUCCESS= '[Categories] Edit category success';
export class EditCategorySuccess implements Action {
  readonly type = EDIT_CATEGORY_SUCCESS;

  constructor(public payload) {}
}

export const  EDIT_CATEGORY_FAIL= '[Categories] Edit category fail';
export class EditCategoryFail implements Action {
  readonly type = EDIT_CATEGORY_FAIL;

  constructor(public payload) {}
}


export const  ADD_TO_POST_LIST= '[Category posts length update] Add to post list';
export class AddToPostList implements Action {
  readonly type = ADD_TO_POST_LIST;

  constructor(public payload) {}
}






export type All = LoadCategories | LoadCategoriesSuccess | LoadCategoriesFail 
| AddCategory | AddCategoryFail | AddCategorySuccess |AddToPostList| EditCategory | EditCategorySuccess
|EditCategoryFail | RemoveCategory | RemoveCategorySuccess | RemoveCategoryFail;