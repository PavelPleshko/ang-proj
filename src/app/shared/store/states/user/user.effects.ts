import {Injectable} from '@angular/core';
import {Effect,Actions,ofType} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import {of} from 'rxjs/observable/of';
import * as userActions from './user.actions';
import {AuthService} from '../../../../auth/services/auth.service';
import {ProfileService} from '../../../../profile/services/profile.service';
//import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class UserEffects{

	constructor(public actions$:Actions,public authService:AuthService,
		private profileService:ProfileService){}

@Effect()
loginUser$ = this.actions$.pipe(ofType(userActions.LOGIN_USER),
	switchMap((data:any)=>{
		let payload = data.payload;
		return this.authService.authenticateUser(payload).pipe(
			catchError((error) => {
				console.log(error)
				return of(new userActions.LoginUserFail(error));
			}),
			map((currentUser:any)=>{
				return new userActions.LoginUserSuccess(currentUser);
			}),

			
	)}))

@Effect()
getMyProfile$ = this.actions$.pipe(ofType(userActions.GET_USER_PROFILE),
	switchMap(()=>{
		return this.profileService.getMyProfile().pipe(
			
			map((currentUser:any)=>{
				return new userActions.GetUserProfileSuccess(currentUser);
			}),
			catchError((error) => {
				return of(new userActions.GetUserProfileFail(error));
			})

			
	)}))


}