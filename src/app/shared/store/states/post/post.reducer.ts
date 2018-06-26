import { ActionReducer} from '@ngrx/store';
import * as postActions from './post.actions';
import { postsState } from './post.initial-state';
import { PostsTable,PostsState } from './post.interface';


export function postsReducer(state:PostsState=postsState(),
	action:postActions.All):PostsState{

	switch (action.type) {
		case postActions.LOAD_POSTS:{
			return {
				...state,
				loading:true
			}
		}
		case postActions.LOAD_POSTS_SUCCESS:
		case postActions.GET_FILTERED_BY_CATEGORY_SUCCESS:
		case postActions.GET_FILTERED_POSTS_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:{
					...state.data,
					byId:action.payload.byId,
					allIds:action.payload.allIds,
					total:state.data.total
				}
			}
		}
		case postActions.LOAD_POSTS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case postActions.ADD_POST_SUCCESS:{
			return {
				...state,
				data:{
					...state.data,
					byId:{
						...state.data.byId,
						[action.payload._id]:action.payload,

					},
					allIds:[action.payload._id,...state.data.allIds],
					total:state.data.total++
				}
				
			}
		}

		case postActions.EDIT_POST:{
			return {
				...state,
				loading:true,
				loaded:false
			}
		}

		case postActions.EDIT_POST_SUCCESS:{
			return {
				...state,
				data:{
						...state.data,
					byId:{
						...state.data.byId,
						[action.payload._id]:action.payload
					},
					allIds:[...state.data.allIds],
					total:state.data.total
				},
				loading:false,
				loaded:true
			}
		}

			case postActions.REMOVE_POST_SUCCESS:{
			const ordersTbl = {
				...state,
				data:{
						...state.data,
					byId:{
						...state.data.byId,
					},
					allIds:[...state.data.allIds].filter((id)=>id != action.payload),
					total:state.data.total--
				},
				loading:false,
				loaded:true
			}

			delete ordersTbl.data.byId[action.payload];
			return ordersTbl;
		}

		case postActions.SET_POSTS_TOTAL:{
			return {
				...state,
				data:{
					...state.data,
					total:action.payload
				}
			}
		}

		case postActions.SET_FILTER_OBJECT:{
			return {
				...state,
				data:{
					...state.data,
					filters:{
						raw:action.payload.raw,
						transformed:action.payload.transformed
					}
				}
			}
		}

		case postActions.REMOVE_FILTER:{
			let filterId = action.payload;

			let newFilters:any = {raw:{...state.data.filters['raw']},
			transformed:{...state.data.filters['transformed']}};
			delete newFilters.raw[filterId];
			delete newFilters.transformed[filterId];
			return {
				...state,
				data:{
					...state.data,
					filters:newFilters
				}
			}
		}
	

		default:{
			return state;
		}
		
	}
}