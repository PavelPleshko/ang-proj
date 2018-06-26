import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';

import {SharedModule} from '../shared/shared.module';


export const ROUTES:Routes = [
{path:'auth',loadChildren:'../auth/auth.module#AuthModule'}
];


@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(ROUTES)
  ],
  declarations: [],
  exports:[]
})
export class MainModule { }
