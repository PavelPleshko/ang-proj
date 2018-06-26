import { ActionReducer} from '@ngrx/store';
import * as UserActions from './user.actions';
import { userState } from './user.initial-state';
import { UserState } from './user.interface';


export function userReducer(state:UserState=userState(),action:UserActions.All):UserState{

	switch (action.type) {
		case UserActions.LOGIN_USER:{
			return {
				...state,
				loading:true
			}
		}
		case UserActions.LOGIN_USER_SUCCESS:
		case UserActions.GET_PROFILE_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:{
					currentUser:action.payload
				}
			}
		}
		case UserActions.LOGIN_USER_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case UserActions.UPDATE_USER_PROFILE_SUCCESS:{
			return {
				...state,
				data:{
					...state.data,
				currentUser:action.payload.currentUser
				}
			}
		}

		default:{
			return state;
		}
		
	}
}