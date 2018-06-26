import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as userActions from '../../../shared/store/states/user/user.actions';
import {getCurrentUser} from '../../../shared/store/states/user/user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {
loginForm:FormGroup;
submitted:boolean = false;
errorText:string = null;
success:boolean = false;
showAllErrorsIfExist:boolean = false;
showPassword:boolean = false;
subs:Subscription[] = [];
  constructor(private fb:FormBuilder,private authService:AuthService,
  	private snotifyService:SnotifyService,private router:Router,private store$:Store<any>) { }

  ngOnInit() {
  	this.loginForm = this.fb.group({
  		username:['',Validators.required],
  		password:['',Validators.required]
  	})

        let loginSub =   this.store$.select(getCurrentUser).subscribe((res:any)=>{
        if(res && !res.error){
          this.success = true;
          let notification = this.createSuccessMsg(res);
          let toast = this.snotifyService.success(notification,'Redirecting...');      
          let token = res.token;
          if(token){
            this.authService.setCurrentUser(res);      
            this.authService.setToken(token);
          }
          toast.on('beforeHide',()=>{
            this.router.navigateByUrl('posts');
          });
        

        }else if(res && res.error){
          this.errorText = res.error.error.message;
        }
        this.submitted = false;
      });

        this.subs.push(loginSub);
  }

showToggle(type:string){
  this[type] = !this[type];
}

  loginUser(){
  	if(this.loginForm.valid){
  		this.showAllErrorsIfExist = false;
  		let data = this.loginForm.value;
  		this.errorText=null;
  		this.submitted = true;

      this.store$.dispatch(new userActions.LoginUser(data));


  	}else{
  		this.showAllErrorsIfExist = true;
  	}
  }


  private createSuccessMsg(user):string{
  	let greeting:string;
  	if(user && user.username){
  		greeting = `Sign in successful. Welcome, ${user.username}`;
  	}else{
  		greeting = `Sign in successful. Welcome, Anonymous`;
  	}
  	return greeting;
  }

  

ngOnDestroy(){
  this.subs.forEach((sub)=>{
    sub.unsubscribe();
  })
}
}
