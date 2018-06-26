import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';


import {RouterModule,Routes} from '@angular/router';

export const ROUTES:Routes = [
{path:'signin',component:LoginComponent},
{path:'signup',component:RegisterComponent}
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(ROUTES),SharedModule.forRoot()
  ],
  declarations: [RegisterComponent, LoginComponent],
 
})
export class AuthModule { 

	public static forRoot(): ModuleWithProviders {
    return {ngModule: AuthModule, 
    	providers: [AuthService]};
  }
  }
