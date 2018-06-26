import { PostsState } from './post.interface';

export function postsState(): PostsState {
  return {
    data:{
    byId: {},
    allIds: [],
    total:0,
    filters:{
      raw:null,
      transformed:null
    }
	},
	loading:false,
	loaded:false
  	};
}