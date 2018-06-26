import {IStore} from '../interfaces/store.interface';


export function storeState():IStore{
	
return {
	currentUser:undefined,
	categories:undefined,
	posts:undefined,
	tags:undefined
	// updates:undefined
}

}