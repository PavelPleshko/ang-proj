

export interface PostCommon {
	id:string;
	displayedId:number;
	text:string;
	author:string;
	revealAuthor:boolean;
	category:string;
	tags?:Array<string>;
	postedOn:Date;
	likes:Array<string>;
	stars:Array<string>;
	dislikes:Array<string>;
	comments:Array<any>;
	assets?:Array<any>;
}



export interface PostsTable{
	
 	byId: { [key: string]: PostCommon };
	allIds: string[];
	total:number;
	filters:object;
}

export interface PostsArray extends Array<PostCommon>{
}


export interface PostsState{
data:PostsTable;
loading:boolean;
loaded:boolean;
}