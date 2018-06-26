export class Tag {
	id:string;
	title:string;
	createdAt:Date=new Date();
	posts:Array<any>=[];
}
