import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as userActions from '../../../shared/store/states/user/user.actions';
import {getCurrentUser} from '../../../shared/store/states/user/user.selector';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
currentUser:any=null;
  constructor(private $store:Store<any>) { }

  ngOnInit() {
  	this.$store.select(getCurrentUser).subscribe((user)=>{
  		console.log(user);
  		this.currentUser = user;
  	})
  	this.getUserWithProfile();
  }

  getUserWithProfile(){
  	this.$store.dispatch(new userActions.GetUserProfile());
  }
}
