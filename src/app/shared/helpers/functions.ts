
export function removeEmpty(obj){
     obj = JSON.parse(JSON.stringify(obj));
   var newObj = new Object();
    for(var key in obj){
      if(typeof obj[key] == 'object'){
        if(obj[key] && obj[key].hasOwnProperty('length') && obj[key].length > 0){
          newObj[key] = obj[key];
        }else{
          if(!isEmptyObject(obj[key])){
                      newObj[key] = removeEmpty(obj[key]);
          }
        }
      }else{
        if(obj[key] !== undefined && obj[key] !== null && obj[key] !== ''){         
                newObj[key] = obj[key];
              
        }
      }
    }
  return newObj;
}

export function isEmptyObject(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop) && (obj[prop] !== null && obj[prop] !== undefined))
            return false;
    }
    return true;
}

export function transformDate(date:string):string{
	let transformed = new Date(date);
	 const dateStr = [transformed.getFullYear(),transformed.getMonth()+1,transformed.getDate()]
	 .join('-');
	  return dateStr;
}