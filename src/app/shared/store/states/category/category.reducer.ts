import { ActionReducer} from '@ngrx/store';
import * as categoryActions from './category.actions';
import { categoriesState } from './category.initial-state';
import { CategoriesTable,CategoriesState } from './category.interface';


export function categoriesReducer(state:CategoriesState=categoriesState(),action:categoryActions.All):CategoriesState{

	switch (action.type) {
		case categoryActions.LOAD_CATEGORIES:{
			return {
				...state,
				loading:true
			}
		}
		case categoryActions.LOAD_CATEGORIES_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case categoryActions.LOAD_CATEGORIES_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case categoryActions.ADD_CATEGORY_SUCCESS:{

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

			case categoryActions.ADD_TO_POST_LIST:{
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

		case categoryActions.EDIT_CATEGORY:{
			return {
				...state,
				loading:true,
				loaded:false
			}
		}

		case categoryActions.EDIT_CATEGORY_SUCCESS:{
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

			case categoryActions.REMOVE_CATEGORY_SUCCESS:{
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