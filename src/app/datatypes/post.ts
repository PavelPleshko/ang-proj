export class Post {
	id:string;
	displayedId:number;
	text:string;
	author:string;
	revealAuthor:boolean=false;
	category:string;
	tags?:Array<string>=[];
	postedOn:Date=new Date();
	likes:Array<string> = [];
	stars:Array<string>=[];
	dislikes:Array<string>=[];
	comments:Array<any>=[];
	assets?:Array<any>=[];
}
