import { Component,OnInit } from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {DynamicComponentLoaderService} from './dynamic-loader/dynamic-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
currentUser:any;


constructor(private authService:AuthService,
	private dynamicComponentLoader:DynamicComponentLoaderService){

}

ngOnInit(){


	this.authService.currentUser.subscribe((user)=>{
		this.currentUser = user;

		if(this.currentUser && this.currentUser.role == 'admin'){
			 this.dynamicComponentLoader
      .getComponentFactory('admin').subscribe((data)=>{
      	console.log(data);
      })
		}
		});
}
}
