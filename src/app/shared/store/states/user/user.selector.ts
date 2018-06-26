import {createSelector,createFeatureSelector} from '@ngrx/store';
import {UserState} from './user.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';


export const getUserState = createFeatureSelector<UserState>('currentUser');

export const getCurrentUser = createSelector(getUserState,(state:UserState)=>{
	return state.data.currentUser});


export const getUserLoaded = createSelector(getUserState,(state:UserState)=>{
	return state.loaded;
})

export const getUserLoading = createSelector(getUserState,(state:UserState)=>{
	return state.loading;
})



