import { ActionReducer} from '@ngrx/store';
import * as tagActions from './tag.actions';
import { tagsState } from './tag.initial-state';
import { TagsTable,TagsState } from './tag.interface';


export function tagsReducer(state:TagsState=tagsState(),action:tagActions.All):TagsState{

	switch (action.type) {
		case tagActions.LOAD_TAGS:{
			return {
				...state,
				loading:true
			}
		}
		case tagActions.LOAD_TAGS_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case tagActions.LOAD_TAGS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case tagActions.ADD_TAG_SUCCESS:{

			return {
				...state,
				data:{
					byId:{
						...state.data.byId,
						[action.payload._id]:action.payload
					},
					allIds:[...state.data.allIds,action.payload._id]
				}
				
			}
		}

			case tagActions.ADD_TO_POST_LIST:{
			return {
				...state,
				data:{

					byId:{
						...state.data.byId,
						[action.payload.categoryId]:{
							...state.data.byId[action.payload.categoryId],
							posts:[...state.data.byId[action.payload.categoryId].posts,
							action.payload.postId]
						}
					},
						allIds:[...state.data.allIds]
				},
				loading:true,
				loaded:false
			}
		}

		case tagActions.EDIT_TAG:{
			return {
				...state,
				loading:true,
				loaded:false
			}
		}

		case tagActions.EDIT_TAG_SUCCESS:{
			return {
				...state,
				data:{
					byId:{
						...state.data.byId,
						[action.payload.id]:action.payload
					},
					allIds:[...state.data.allIds]
				},
				loading:false,
				loaded:true
			}
		}

			case tagActions.REMOVE_TAG_SUCCESS:{
			const ordersTbl = {
				...state,
				data:{
					byId:{
						...state.data.byId,
					},
					allIds:[...state.data.allIds].filter((id)=>id != action.payload)
				},
				loading:false,
				loaded:true
			}

			delete ordersTbl.data.byId[action.payload];
			return ordersTbl;
		}
	

		default:{
			return state;
		}
		
	}
}