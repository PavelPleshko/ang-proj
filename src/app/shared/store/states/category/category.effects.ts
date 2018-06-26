import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as categoryActions from './category.actions';
import {CategoriesService} from '../../../../post/modules/category/services/categories.service';
import {tableHelper} from '../../../helpers/table';
import {AdminService} from '../../../../admin/services/admin.service';

@Injectable()
export class CategoriesEffects{

	constructor(public actions$:Actions,public categoriesService:CategoriesService,
		private adminService:AdminService){}

@Effect()
loadCategories$ = this.actions$.ofType(categoryActions.LOAD_CATEGORIES).pipe(
	switchMap(()=>{
		return this.categoriesService.getAllCategories().pipe(
			map((categories:any)=>{
				categories = tableHelper(categories);
				return new categoryActions.LoadCategoriesSuccess(categories);
			}),
			catchError((error) => of(new categoryActions.LoadCategoriesFail(error)))
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
addCategory$ = this.actions$.ofType(categoryActions.ADD_CATEGORY).pipe(
	switchMap((action)=>{
			let item = action['payload'].item;
			let type = action['payload'].type;
		return this.adminService.create(type,item).pipe(
			map((newCategory)=>{
				console.log(newCategory);
				return new categoryActions.AddCategorySuccess(newCategory);
			}),
			catchError((error)=> {
				return of(new categoryActions.AddCategoryFail(error))}))
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