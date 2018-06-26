import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeroComponent } from './components/profile-hero/profile-hero.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import {ProfileService} from './services/profile.service';
import { ProfileProgressbarComponent } from './components/profile-dashboard/components/profile-progressbar/profile-progressbar.component';


export const ROUTES:Routes = [
{path:'',pathMatch:'full',component:ProfileComponent}
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(ROUTES)
  ],
  declarations: [ProfileComponent, ProfileHeroComponent, ProfileDashboardComponent, ProfileProgressbarComponent],
  providers:[ProfileService]
})
export class ProfileModule { }
