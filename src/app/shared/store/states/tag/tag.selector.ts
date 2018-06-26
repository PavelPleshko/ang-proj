import {createSelector,createFeatureSelector} from '@ngrx/store';
import {TagsTable,TagsState,TagsArray} from './tag.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';




export const getAllTagsState = createFeatureSelector<TagsState>('tags');

export const getAllTags = createSelector(getAllTagsState,(state:TagsState)=>state.data);

export const getTagsArray = createSelector(getAllTags,(state:TagsTable)=>{
	const tags = state.allIds.map(tagId=>{
		let tag = state.byId[tagId];
		return tag;
	})
	return tags;
});

export const getOrdersLoaded = createSelector(getAllTagsState,(state:TagsState)=>{
	return state.loaded;
})

export const getOrdersLoading = createSelector(getAllTagsState,(state:TagsState)=>{
	return state.loading;
})


