import { Component, OnInit,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import {FormBuilder,FormArray,FormGroup,FormControl,Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {Store} from '@ngrx/store';
import * as postActions from '../../../shared/store/states/post/post.actions';
import {getCategoriesArray} from '../../../shared/store/states/category/category.selector';
import {getTagsArray} from '../../../shared/store/states/tag/tag.selector';



@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit,OnDestroy{
postForm:FormGroup;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
@ViewChild('tagsInput') tagsInput:NgbTypeahead;

categories:Array<any>;
tags:Array<any>;
subscriptions = [];

  constructor(private activeModal: NgbActiveModal,private fb:FormBuilder,
  	private postService:PostService,private store$:Store<any>) { }

  ngOnInit() {
  	let catSub = this.store$.select(getCategoriesArray).subscribe((categories)=>{
  		this.categories = categories;
  	});
  		let tagSub = this.store$.select(getTagsArray).subscribe((tags)=>{
  		this.tags = tags;
  	})
  	this.postForm = this.fb.group({
  		text:['',[Validators.required,Validators.minLength(15),Validators.maxLength(1500)]],
  		category:[null,Validators.required],
  		revealAuthor:[false],
  		tags:this.fb.array([])
  	})
  	this.postForm.valueChanges.subscribe((val)=>console.log(val));
  	this.subscriptions.push(catSub,tagSub);
  }


closeModal(){
this.activeModal.close();
}

selectTag(event){
event.preventDefault();
let value = event.item;
this.tagsInput.writeValue('');
this.addControlToArray('tags',value);
}

removeFromArray(arrayName,i){
	let form = this.postForm.get(arrayName) as FormArray;
	form.removeAt(i);
}



addControlToArray(arrayName,value){
	let newcontrol = new FormControl();
	newcontrol.patchValue(value);
	let formArray = this.postForm.get(arrayName) as FormArray;
	formArray.push(newcontrol);
}

searchTags = (text$: Observable<string>) =>{
	return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.focus$),
      merge(this.click$.pipe(filter(() => !this.tagsInput.isPopupOpen()))),
      map(term => (term === '' ? this.tags.map((tag)=>tag.title)
        : this.tags.map((tag)=>tag.title).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 7))
    );
}
  

    submitForm():void{
    	if(this.postForm.valid){
    		let value = this.postForm.value;
		    	value.tags = this.tags.map((tag)=>{
		  		if(value.tags.includes(tag.title)){
		  			return tag._id;
		  		}
		  	}).filter((val)=>!!(val));
    		this.store$.dispatch(new postActions.AddPost(this.postForm.value));
    	}
    }

    ngOnDestroy(){
    	this.subscriptions.forEach((sub)=>{
    		sub.unsubscribe();
    	})
    }
}
