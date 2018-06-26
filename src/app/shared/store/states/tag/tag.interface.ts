

export interface TagCommon {
  id:string;
  title:string;
  createdAt:Date;
  posts:Array<any>;
}



export interface TagsTable{
	
 	byId: { [key: string]: TagCommon };
	allIds: string[];
}

export interface TagsArray extends Array<TagCommon>{
}


export interface TagsState{
data:TagsTable;
loading:boolean;
loaded:boolean;
}