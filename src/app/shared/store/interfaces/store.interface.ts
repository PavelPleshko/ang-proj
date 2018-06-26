import {UserState} from '../states/user/user.interface';
import {PostsState} from '../states/post/post.interface';
import {CategoriesState} from '../states/category/category.interface';
import {TagsState} from '../states/tag/tag.interface';

export interface IStore{
	currentUser:UserState;
	categories:CategoriesState;
	posts:PostsState;
	tags:TagsState;
}