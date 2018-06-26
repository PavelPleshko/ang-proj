import {createSelector,createFeatureSelector} from '@ngrx/store';
import {CategoriesTable,CategoriesState,CategoriesArray} from './category.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';




export const getAllCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const getAllCategories = createSelector(getAllCategoriesState,(state:CategoriesState)=>state.data);

export const getCategoriesArray = createSelector(getAllCategories,(state:CategoriesTable)=>{
	const cats = state.allIds.map(catId=>{
		let cat = state.byId[catId];
		return cat;
	})
	return cats;
});

export const getOrdersLoaded = createSelector(getAllCategoriesState,(state:CategoriesState)=>{
	return state.loaded;
})

export const getOrdersLoading = createSelector(getAllCategoriesState,(state:CategoriesState)=>{
	return state.loading;
})


