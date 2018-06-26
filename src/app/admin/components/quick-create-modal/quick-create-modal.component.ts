import { Component, OnInit,ViewChild,ElementRef,Input,OnDestroy } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormArray,FormGroup,FormControl,Validators} from '@angular/forms';
import {take,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {SnotifyService} from 'ng-snotify';
import { Actions,ofType } from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {AdminService} from '../../services/admin.service';
import * as categoryActions from '../../../shared/store/states/category/category.actions';
//import * as tagActions from '../../../shared/store/states/category/category.actions';

@Component({
  selector: 'app-quick-create-modal',
  templateUrl: './quick-create-modal.component.html',
  styleUrls: ['./quick-create-modal.component.scss'],
})
export class QuickCreateModalComponent implements OnInit,OnDestroy{
@Input() data:any;
createForm:FormGroup;
submitted:boolean = false;
showAllErrorsIfExist:boolean = false;
subscriptions:Array<any>=[];

  constructor(private activeModal: NgbActiveModal,private fb:FormBuilder,
  	private adminService:AdminService,
  	private snotifyService:SnotifyService,private updates$:Actions,
  	private store$:Store<any>) { }

  ngOnInit() {
  	this.initForm(this.data.type);
  	let updatesSub = this.updates$.pipe(ofType(categoryActions.ADD_CATEGORY_SUCCESS)).subscribe((data)=>{
  		let successNotification = this.snotifyService.success(`Created successfully`,`Created ${this.data.type}`,
  			{showProgressBar:false,
  				timeout:1000});
  			this.createForm.reset();
  		},(err)=>{
  			this.submitted=false;
  		let errorNotification = this.snotifyService.error(err.statusText,`Error ${err.status}`,{
  			showProgressBar:false,
  			timeout:5000
  		})
  		})
  	this.subscriptions.push(updatesSub);
  }


closeModal(){
this.activeModal.close();
}

initForm(type:string){
switch (type) {
	case "category":
		this.createForm = this.createCategoryForm();
		break;
	case "tag":
		this.createForm = this.createTagForm();
		break;
}
}

createCategoryForm():FormGroup{
	let form = this.fb.group({
		title:['',Validators.required]
	});
	return form;
}

createTagForm():FormGroup{
	let form = this.fb.group({
		title:['',Validators.required]
	});
	return form;
}

checkUniqueness(value:string,formControl:FormControl){
if(value && value.length > 3){
	  	let exists = this.adminService.checkIfExists(this.data.type,value);
		  	let allow = false;
		  	exists.pipe(catchError(err=>{
		  		return of(err);
		  	}),take(1)).subscribe((data:any)=>{
		  		
		  		console.log(data);
		  		let error = data.status != 200 ? {exists:true} : null;
		  		if(error != null){
		  			formControl.setErrors({...formControl.errors,...error});
		  		}
			  	
			  	  	});

}
}

submitForm(){
		this.submitted = false;
  	this.showAllErrorsIfExist = false;
  	if(!this.createForm.valid){
  		this.showAllErrorsIfExist = true;
  		return;
  	};
  	let data = this.createForm.value;
  		this.submitted = true;
  	
  	
  	this.store$.dispatch(new categoryActions.AddCategory({type:this.data.type,item:data}));
}

ngOnDestroy(){
	this.subscriptions.forEach((sub)=>{
		sub.unsubscribe();
	})
}

}