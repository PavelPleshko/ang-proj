import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {take,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {SnotifyService} from 'ng-snotify';

import {PasswordValidation} from '../../../shared/helpers/match-password-validator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
signupForm:FormGroup;
submitted:boolean = null;
showAllErrorsIfExist:boolean =false;
showPassword:boolean = false;
showConfirmPassword:boolean = false;

  constructor(private fb:FormBuilder,private authService:AuthService,
  	private snotifyService:SnotifyService,private router:Router) { }

  ngOnInit() {

  	this.signupForm = this.fb.group({
  		username:['',[Validators.required,Validators.minLength(4),Validators.maxLength(25)]],
  		gender:['male'],
  		age:[18,[Validators.required,Validators.min(14),Validators.max(90)]],
  		email:['',Validators.email],
  		password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(35)]],
  		confirmPassword:['',[Validators.required]]
  	},
  	{
  		validator:PasswordValidation.MatchPassword
  	})
  }

showToggle(type:string){
	this[type] = !this[type];
}


  registerUser(){
  	this.submitted = false;
  	this.showAllErrorsIfExist = false;
  	if(!this.signupForm.valid){
  		this.showAllErrorsIfExist = true;
  		return;
  	};
  
  	delete this.signupForm.value.confirmPassword;
  	let data = this.signupForm.value;
  		this.submitted = true;
  	this.authService.registerUser(data).subscribe((data)=>{
  		let successNotification = this.snotifyService.success('Sign up successful.','Redirecting...');
  		successNotification.on('beforeHide',()=>{
  			this.router.navigateByUrl('profile/me');

  		})
  	},
  	(error)=>{
  			this.submitted=false;
  		let errorNotification = this.snotifyService.error(error.statusText,`Error ${error.status}`,{
  			showProgressBar:false,
  			timeout:5000
  		})
  	
  	});
  

  }


  usernameExists(value:string,control:FormControl){
  	if(value.length >= 4){ //check username if its long enough
  		  	let exists = this.authService.checkIfExists(value);
		  	let allow = false;
		  	exists.pipe(catchError(err=>{
		  		return of(err);
		  	}),take(1)).subscribe((data:any)=>{
		  		
		  		console.log(data);
		  		let error = data.status != 200 ? {exists:true} : null;
		  		if(error != null){
		  			control.setErrors({...control.errors,...error});
		  		}
			  	
			  	  	});

  	}

  }

}
