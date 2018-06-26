import { CategoriesState } from './category.interface';

export function categoriesState(): CategoriesState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}