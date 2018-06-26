import { NgModule,ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ValidateOnBlurDirective } from './directives/validate-on-blur.directive';
import { FromNowPipe } from './pipes/from-now.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { OverflowPipe } from './pipes/overflow.pipe';
import {MultipleFilterPipe} from './pipes/multiple-filter.pipe';
import {CreatePostModalComponent} from '../post/components/create-post-modal/create-post-modal.component';
import {QuickCreateModalComponent} from '../admin/components/quick-create-modal/quick-create-modal.component';

import {AlertService} from './services/alert.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';



@NgModule({
  imports: [
    CommonModule,RouterModule,ReactiveFormsModule,FormsModule,NgbModule
  ],
  
  declarations: [MainNavComponent,MainContentComponent, ValidateOnBlurDirective,
   FromNowPipe,CapitalizePipe,MultipleFilterPipe,OverflowPipe,CreatePostModalComponent, 
   AdminPanelComponent,QuickCreateModalComponent],
  
  exports:[MainNavComponent,MainContentComponent,ReactiveFormsModule,
  FormsModule,ValidateOnBlurDirective,FromNowPipe,CapitalizePipe,MultipleFilterPipe,OverflowPipe,
  CreatePostModalComponent,AdminPanelComponent],
  
  entryComponents:[CreatePostModalComponent,QuickCreateModalComponent]
})
export class SharedModule{ 

	public static forRoot(): ModuleWithProviders {
    return {ngModule: SharedModule, 
    	providers: [AlertService]};
  }
}
