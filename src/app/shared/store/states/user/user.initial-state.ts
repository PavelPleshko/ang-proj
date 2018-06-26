import { UserState } from './user.interface';

export function userState(): UserState {
  return {
    data:{currentUser:undefined
	},
	loading:false,
	loaded:false
  	};
}