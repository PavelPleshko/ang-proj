import {userReducer} from './user/user.reducer';
import {categoriesReducer} from './category/category.reducer';
import {postsReducer} from './post/post.reducer';
import {tagsReducer} from './tag/tag.reducer';
import {ActionReducerMap,MetaReducer} from '@ngrx/store';
import {IStore} from '../interfaces/store.interface';
import {enableBatchReducer} from 'ngrx-batch-action-reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../../environments/environment';

export const reducers:ActionReducerMap<IStore> = {
	currentUser:userReducer,
	categories:categoriesReducer,
	posts:postsReducer,
	tags:tagsReducer
}


export const metaReducers: MetaReducer<IStore>[] = !environment.production ?
[storeFreeze, enableBatchReducer] :
[enableBatchReducer];