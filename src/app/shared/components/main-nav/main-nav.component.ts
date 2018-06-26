import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatePostModalComponent} from '../../../post/components/create-post-modal/create-post-modal.component';
import {SnotifyService} from 'ng-snotify';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
loggedIn:boolean = false;
@Input() currentUser:any;
  constructor(private authService:AuthService,private modalService:NgbModal,
  	private snotifyService:SnotifyService,private router:Router) { }

  ngOnInit() {
  	
  }


  logout(){
  	this.authService.logout();
  }

  openCreatePostModal(){
  	let user =this.currentUser;
  	if(user){
  		  	const modalRef = this.modalService.open(CreatePostModalComponent,{size:'lg'});

  		  }else{
  		  let errorToast = this.snotifyService.error('Please sign in to create posts.','Denied',{
  		  	showProgressBar:false,
  		  	closeOnClick:true
  		  })
  		  let self = this;
  		errorToast.on('beforeHide',function(){

  			self.router.navigateByUrl('auth/signin');
  		})
  		  }

  }

}
