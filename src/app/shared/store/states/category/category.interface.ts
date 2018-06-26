

export interface CategoryCommon {
  id:string;
  title:string;
  createdOn:Date;
  posts:Array<any>;
}



export interface CategoriesTable{
	
 	byId: { [key: string]: CategoryCommon };
	allIds: string[];
}

export interface CategoriesArray extends Array<CategoryCommon>{
}


export interface CategoriesState{
data:CategoriesTable;
loading:boolean;
loaded:boolean;
}