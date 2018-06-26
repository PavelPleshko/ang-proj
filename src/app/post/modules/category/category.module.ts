import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CategoryListComponent} from './components/category-list/category-list.component';
import {CategoriesService} from './services/categories.service';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryListComponent],
  providers:[CategoriesService],
  exports:[CategoryListComponent]
})
export class CategoryModule { }
