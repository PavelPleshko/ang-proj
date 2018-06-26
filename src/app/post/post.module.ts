import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import {RouterModule,Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {PostService} from './services/post.service';
import { PostTileSingleComponent } from './components/post-tile-single/post-tile-single.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PostFiltersComponent } from './components/post-filters/post-filters.component';
import { PostSearchComponent } from './components/post-search/post-search.component';
import {CategoryModule} from './modules/category/category.module';
import {TagModule} from './modules/tag/tag.module';

export const ROUTES:Routes = [
{path:'',pathMatch:'full',component:PostsComponent}

];


@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(ROUTES),SharedModule.forRoot(),
    NgbModule,CategoryModule,TagModule
  ],
  declarations: [PostsComponent, PostTileSingleComponent,
   PostFiltersComponent, PostSearchComponent],
  providers:[PostService],
  exports:[PostsComponent]
})
export class PostModule { }
