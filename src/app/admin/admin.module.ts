import { NgModule,InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import {DynamicComponentManifest,DYNAMIC_COMPONENT} from '../dynamic-loader/dynamic-component-manifest';
import {AdminService} from './services/admin.service';

@NgModule({
  imports: [
    CommonModule
  ],
   providers: [
    { provide: DYNAMIC_COMPONENT, useValue: AdminHomeComponent },
    AdminService
  ],
  declarations: [AdminHomeComponent],
  entryComponents:[
AdminHomeComponent
  ]
})
export class AdminModule { }
