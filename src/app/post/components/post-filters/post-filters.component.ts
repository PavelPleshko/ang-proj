import { Component, OnChanges,Input,ChangeDetectionStrategy,Output,EventEmitter } from '@angular/core';
import {transformDate} from '../../../shared/helpers/functions';

@Component({
  selector: 'app-post-filters',
  templateUrl: './post-filters.component.html',
  styleUrls: ['./post-filters.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostFiltersComponent implements OnChanges {
@Input() filters;
@Output() filterRemoved:EventEmitter<string> = new EventEmitter<string>();
exclude:Array<string> = [
'pagenumber','limit','skip'
];

filtersMap = {
'revealAuthor':{
	title:'Reveal author',
	transform:function(value){
		return {
			title:'Reveal author',
			value: value ? 'Yes' : 'No'
		};
	}
},
'category':{
	transform:function(value){
		return {
			title:'By categories',
			value: value
		};
	}
},
'tags':{
	transform:function(value){
		return {
			title:'By tags',
			value: value
		};
	}
},
'postedFrom':{
	transform:function(value){
		return {	    
			title:'Start date',
		    value:transformDate(value)
			}
		}
},
'postedTo':{
	transform:function(value){
		return {
			title:'End date',
			value:transformDate(value)
		}
	}
}

};
  constructor() { }


ngOnChanges(changes){
	if(changes && this.filters){
		this.filters = Object.keys(this.filters).map((key)=>{
			if(this.filtersMap[key]){
				return {
					id:key,
					data: this.filtersMap[key].transform(this.filters[key]),
				}
			}
		}).filter((val)=>{
			return !!(val);
		});
	}
}

removeFilter(filterId:string):void{
	this.filterRemoved.emit(filterId);
}


}
