import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TagsService} from './services/tags.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[TagsService]
})
export class TagModule { }
