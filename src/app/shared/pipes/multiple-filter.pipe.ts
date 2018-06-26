import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'multipleFilter',pure:true})


export class MultipleFilterPipe implements PipeTransform {
	transform(list:any[],filterObject,updateTotalFn):any{
if(!filterObject || this.isEmptyObject(filterObject)){
	return list;
	}

var filteredItems:any[] = list;

for(var key in filterObject){
	if(!filterObject[key].value) continue;
	filteredItems = filteredItems.filter(item=>{
		let functionName = `${filterObject[key].type}Filter`;
		let searchValue = filterObject[key].value;
		return this[functionName](item[key],searchValue);
	});
}
updateTotalFn(filteredItems.length);
return filteredItems;	
}

stringFilter(itemValue,searchValue){
	let field = itemValue.toString().toLowerCase();
	return field.indexOf(searchValue) >= 0;
}

numberFilter(itemValue,searchValue){
	return itemValue <= searchValue;
}

dateFilter(itemValue,searchValue){
let from = searchValue.fromDate;
let to = searchValue.toDate;
if(!from || !to) return true;
let fromDate = new Date(from.year,from.month-1,from.day);
let toDate = new Date(to.year,to.month-1,to.day);
itemValue = new Date(itemValue);
return itemValue >= fromDate && itemValue <= toDate;
}

arrayFilter(itemValue,searchValue){
	return itemValue.some((item)=>item.toLowerCase().indexOf(searchValue.toLowerCase())>=0);
}

isEmptyObject(obj){
	for(var key in obj){
		if(obj[key].hasOwnProperty('value') && typeof obj[key].value == 'object'){
			if(typeof obj[key] != 'object'){
				this.isEmptyObject(obj[key].value);
			}else{
				this.isEmptyObject(obj[key]);
			}
			
		}
		if(obj[key].value){
			if(obj[key].value.length > 0) return false;
		}else{
			if(obj[key] || obj[key].length > 0) return false;
		}
	}
	return true;
}
}