import { TagsState } from './tag.interface';

export function tagsState(): TagsState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}