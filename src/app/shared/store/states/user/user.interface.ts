

export interface ProfileCommon{
	age:number;
	gender?:'male' | 'female';
	email:string;
	bio:string;
	location:string;
	likedPosts:any[];
	dislikedPosts:any[];
	starredPosts:any[];
	userPosts:any[];
	comments:any[];

}

export interface UserCommon {
    id:string;
	username:string;
	displayName:string;
	role:string;
	profile:ProfileCommon;
	notifications:any[];
	token?:any;
}



export interface UserState{
data:{currentUser:UserCommon};
loading:boolean;
loaded:boolean;
}