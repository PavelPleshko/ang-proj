import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as tagActions from './tag.actions';
import {TagsService} from '../../../../post/modules/tag/services/tags.service';
import {tableHelper} from '../../../helpers/table';
import {AdminService} from '../../../../admin/services/admin.service';

@Injectable()
export class TagsEffects{

	constructor(public actions$:Actions,public tagsService:TagsService,
		private adminService:AdminService){}

@Effect()
loadTags$ = this.actions$.ofType(tagActions.LOAD_TAGS).pipe(
	switchMap(()=>{
		return this.tagsService.getAllTags().pipe(
			map((categories:any)=>{
				categories = tableHelper(categories);
				return new tagActions.LoadTagsSuccess(categories);
			}),
			catchError((error) => of(new tagActions.LoadTagsFail(error)))
	)}));


//@Effect()
// editOrder$ = this.actions$.ofType(ordersActions.EDIT_ORDER).pipe(
// 	switchMap((action)=>{
// 			let order = action['payload'];
// 		return this.ordersService.editOrder(order).pipe(
// 			map(()=>{
// 				return new ordersActions.EditOrderSuccess(order);
// 			}),
// 			catchError((error)=> {
// 				return of(new ordersActions.EditOrderFail(error))}))
// 	})
// 	)


@Effect()
addTag$ = this.actions$.ofType(tagActions.ADD_TAG).pipe(
	switchMap((action)=>{
			let item = action['payload'].item;
			let type = action['payload'].type;
		return this.adminService.create(type,item).pipe(
			map((newTag)=>{
				console.log(newTag);
				return new tagActions.AddTagSuccess(newTag);
			}),
			catchError((error)=> {
				return of(new tagActions.AddTagFail(error))}))
	})
	)

// @Effect()
// deleteOrder$ = this.actions$.ofType(ordersActions.REMOVE_ORDER).pipe(
// 	switchMap((action)=>{
// 			let orderId = action['payload'];
// 		return this.ordersService.deleteOrder(orderId).pipe(
// 			map(()=>{
// 				return new ordersActions.RemoveOrderSuccess(orderId);
// 			}),
// 			catchError((error)=> {
// 				return of(new ordersActions.RemoveOrderFail(error))}))
// 	})
// 	)
}