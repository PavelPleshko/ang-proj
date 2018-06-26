import { Component, OnInit,Output,EventEmitter,Input,
	ChangeDetectionStrategy,ViewChild,ElementRef} from '@angular/core';
import {FormBuilder,FormGroup,FormArray,FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, merge} from 'rxjs/operators';
import {NgbTypeahead,NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostSearchComponent implements OnInit {
searchForm:FormGroup;
@Output() searchPosts = new EventEmitter();
@Input() categories:any;
@Input() tags:any;
showSearch:boolean = false;
catfocus$ = new Subject<string>();
catclick$ = new Subject<string>();
tagfocus$ = new Subject<string>();
tagclick$ = new Subject<string>();
@ViewChild('categoriesInput') categoriesInput:NgbTypeahead;
@ViewChild('tagsInput') tagsInput:NgbTypeahead;
@ViewChild('to') toDateInput:NgbInputDatepicker;
@ViewChild('tillnow') tillnow:ElementRef;

  constructor(private fb:FormBuilder) {
 
   }

  ngOnInit() {
  	this.initializeForm();
  }


  initializeForm(){
  	this.searchForm = this.fb.group({
  		category:this.fb.array([]),
  		postedFrom:[null],
  		postedTo:[null],
  		tags:this.fb.array([]),
  		revealAuthor:[false],
  		order:[-1]
  	});

  }



  toggleShowSearch(){
  	this.showSearch = !this.showSearch;
  }

  submitForm(){
  	let value = JSON.parse(JSON.stringify(this.searchForm.value));
  
  	
  	value.postedFrom = this.normalizeDate(value.postedFrom);
  	if(value.postedFrom !== null && !value.postedTo){
  		value.postedTo = new Date()
  	    this.setUntilCurrentDate(true);
  	}else{

  	 value.postedTo = this.normalizeDate(value.postedTo);
  	}
  
  	value.category = this.categories.map((cat)=>{
  		if(value.category.includes(cat.title)){
  			return cat._id;
  		};
  	}).filter((val)=>!!(val));
  	value.tags = this.tags.map((tag)=>{
  		if(value.tags.includes(tag.title)){
  			return tag._id;
  		}
  	}).filter((val)=>!!(val));

  	this.searchPosts.emit(value);
  }

removeFromArray(arrayName,i){
	let form = this.searchForm.get(arrayName) as FormArray;
	form.removeAt(i);
}

addControlToArray(arrayName,value){
	let newcontrol = new FormControl();
	newcontrol.patchValue(value);
	let formArray = this.searchForm.get(arrayName) as FormArray;
	formArray.push(newcontrol);
}

  selectCategory(event){
event.preventDefault();
let value = event.item;
this.categoriesInput.writeValue('');
this.addControlToArray('category',value);
}

  selectTag(event){
event.preventDefault();
let value = event.item;
this.tagsInput.writeValue('');
this.addControlToArray('tags',value);
}

searchCategories = (text$: Observable<string>) =>{
	return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.catfocus$),
      merge(this.catclick$.pipe(filter(() => !this.categoriesInput.isPopupOpen()))),
      map(term => (term === '' ? this.categories.map(cat=>cat.title)
        : this.categories.map(cat=>cat.title).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 7))
    );
}

searchTags = (text$: Observable<string>) =>{
	return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      merge(this.tagfocus$),
      merge(this.tagclick$.pipe(filter(() => !this.tagsInput.isPopupOpen()))),
      map(term => (term === '' ? this.tags.map(tag=>tag.title)
        : this.tags.map(tag=>tag.title).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 7))
    );
}

//dates

setUntilCurrentDate(checked:boolean){
	if(checked){
		this.tillnow.nativeElement.checked = true;
		let date= new Date();
		let denormalizedDate = this.denormalizeDate(date);
		let toDate = this.searchForm.get('postedTo') as FormControl;
		toDate.patchValue(denormalizedDate);
	}else{
		let toDate = this.searchForm.get('postedTo') as FormControl;
		toDate.patchValue(null);
	}
}

clearControl(controlName:any,type:string){
if(type == 'array'){
	let formArr = this.searchForm.get(controlName) as FormArray;
	 while (0 !== formArr.length) {
    formArr.removeAt(0);
	}
}else{
	if(typeof controlName == 'object' && controlName.length){
		controlName.forEach(name=>{
				this.searchForm.get(name).reset();
		})
	}else{
			this.searchForm.get(controlName).reset();
	}
}
}

private normalizeDate(date:any):Date{
	if(date){
		let year = date.year;
		let month = date.month > 0 ? date.month -1 : 0;
		let day = date.day;
		return new Date(year,month,day);
	}else{
		return null;
	}

}

private denormalizeDate(date:Date):{year:number,month:number,day:number}{
	let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		let dateObj = {
			year:year,
			month:month,
			day:day
		};
	return dateObj;
}

}
