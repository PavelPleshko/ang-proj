export function tableHelper(arr){
	let obj = {byId:{},allIds:[]};
	if(arr && arr.length > 0){
		
	arr.forEach(item=>{
		obj.byId[item._id]=item;
		obj.allIds.push(item._id);
	})
	
}
return obj;	
}