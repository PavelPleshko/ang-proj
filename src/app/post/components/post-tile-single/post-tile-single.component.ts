import { Component,AfterViewInit,Input,OnChanges,
	ChangeDetectionStrategy,ChangeDetectorRef,EventEmitter,Output } from '@angular/core';
import {AlertService,MessageAlert} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-post-tile-single',
  templateUrl: './post-tile-single.component.html',
  styleUrls: ['./post-tile-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostTileSingleComponent implements AfterViewInit,OnChanges {
@Input() post;
@Input() currentUser:any;
@Input() alertMessage:MessageAlert;
showMore:boolean = false;
excerptLength:number = 250;

@Output() postAction:EventEmitter<{postId:string,userId:string,type:string}> 
= new EventEmitter<{postId:string,userId:string,type:string}>();

get authorized():boolean{
	return !!(this.currentUser);
}


get userActions():any{
	let liked,disliked,starred;

	if(this.currentUser){
		liked = this.post.likes.includes(this.currentUser._id);
		disliked = this.post.dislikes.includes(this.currentUser._id);
		starred = this.post.stars.includes(this.currentUser._id);
	};
	return {
		liked:liked,
		disliked:disliked,
		starred:starred
	}
}
  constructor(private alertService:AlertService,private cdr:ChangeDetectorRef) { }

  ngAfterViewInit() {
  	this.cdr.detach();
  }

  ngOnChanges(changes){
  	if(changes){
  		this.cdr.detectChanges();
  	}
  }


likePost(){
	if(!this.userActions.liked && !this.userActions.disliked){
		this.postAction.emit({postId:this.post._id,userId:this.currentUser._id,type:'likes'});
	}else if(!this.userActions.disliked){
		let msg:MessageAlert = {
			useExternal:false,
			title:'Error',
			body:'You already liked this post',
			type:'error',
			elementId:this.post._id,
			attr:'likes'
		};
		this.alertService.pushMessage(msg);
	}
}

dislikePost(){
if(!this.userActions.disliked && !this.userActions.liked){
		this.postAction.emit({postId:this.post._id,userId:this.currentUser._id,type:'dislikes'});
	}else if(!this.userActions.liked){
		let msg:MessageAlert = {
			useExternal:false,
			title:'Error',
			body:'You already disliked this post',
			type:'error',
			elementId:this.post._id,
			attr:'dislikes'
		};
		this.alertService.pushMessage(msg);
	}
}

starPost(){
	if(!this.userActions.starred){
		this.postAction.emit({postId:this.post._id,userId:this.currentUser._id,type:'stars'});
	}else if(this.userActions.starred){
		let msg:MessageAlert = {
			useExternal:false,
			title:'Error',
			body:'You have already bookmarked this post',
			type:'error',
			elementId:this.post._id,
			attr:'stars'
		};
		this.alertService.pushMessage(msg);
	}
}

toggleShowMoreLess(){
	this.showMore = !this.showMore;
	this.cdr.detectChanges();
}
}
