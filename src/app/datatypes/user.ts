export class User {
	id:string;
	username:string;
	displayName:string = 'anonymous';
	age:number;
	role:string = 'user';
	password:string;
	postsIds:string[]=[];
	postsPopulated:any[];
	commentsIds:string[] = [];
	commentsPopulated:any[];
	token?:any = undefined;
	gender?:'male' | 'female';

	constructor(
		user){
		if(user){
			this.id = user.id;
			this.username = user.username;
			this.password = user.password;
			this.gender=user.gender;
		}
		

	}
}
