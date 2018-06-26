import { Action } from '@ngrx/store';

import {
  UserCommon,
} from './user.interface';



export const LOGIN_USER = '[User] Login user';
export class LoginUser implements Action {
  readonly type = LOGIN_USER;

  constructor(public payload:any) {}
}

export const LOGIN_USER_SUCCESS = '[User] Login user success';
export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;

  constructor(public payload: UserCommon) {}
}

export const LOGIN_USER_FAIL = '[User] Login users fail';
export class LoginUserFail implements Action {
  readonly type = LOGIN_USER_FAIL;

  constructor(public error) {}
}


export const GET_USER_PROFILE = '[Profile page] Get profile';
export class GetUserProfile implements Action {
  readonly type = GET_USER_PROFILE;

  constructor(public payload?) {}
}

export const  GET_PROFILE_SUCCESS= '[Profile page api response] Get profile success';
export class GetUserProfileSuccess implements Action {
  readonly type = GET_PROFILE_SUCCESS;

  constructor(public payload) {}
}

export const  GET_PROFILE_FAIL= '[Profile page  api response] Get profile fail';
export class GetUserProfileFail implements Action {
  readonly type = GET_PROFILE_FAIL;

  constructor(public payload) {}
}

export const UPDATE_USER_PROFILE = '[User] Update user';
export class UpdateUserProfile implements Action {
  readonly type = UPDATE_USER_PROFILE;

  constructor(public payload) {}
}

export const  UPDATE_USER_PROFILE_SUCCESS= '[User] Update user profile success';
export class UpdateUserProfileSuccess implements Action {
  readonly type = UPDATE_USER_PROFILE_SUCCESS;

  constructor(public payload) {}
}


export const UPDATE_USER_GROUP_FAIL = '[User] Update user profile fail';
export class UpdateUserProfileFail implements Action {
  readonly type = UPDATE_USER_GROUP_FAIL;

  constructor(public error) {}
}

export type All = LoginUser | LoginUserSuccess | LoginUserFail | UpdateUserProfile
|UpdateUserProfileSuccess | UpdateUserProfileFail | GetUserProfile | GetUserProfileSuccess |
GetUserProfileFail;