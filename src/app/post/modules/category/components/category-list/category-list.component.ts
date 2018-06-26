import { Component, OnChanges,Input,EventEmitter,Output,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnChanges {
@Input() categories:any;
filteredCategories;
categoriesCollapsed:boolean = true;
categoriesVisible:boolean = true;
activeCategory:string=null;
@Output() getPostsByCategoryId:EventEmitter<{category:Array<string>}> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes) {
  	if(changes){
  		 	if(!this.categoriesCollapsed){
  			this.filteredCategories = this.categories.slice();
  	}else{
  		  	this.filteredCategories = this.categories.slice(0,6);
  	}
  	}
  }

toggleCategoryVisible(){
	this.categoriesVisible = !this.categoriesVisible;
}

  showOrHideCategories(){
	if(this.categoriesCollapsed){
		this.filteredCategories = this.categories.slice();
		this.categoriesCollapsed = false;
	}else{
		this.filteredCategories = this.categories.slice(0,6);
		this.categoriesCollapsed = true;
	}	
}

getPostsByCategory(category){
	this.getPostsByCategoryId.emit({category:[category.id]});
	this.activeCategory = category;
}


}
