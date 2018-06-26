import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {reducers,metaReducers} from './shared/store/states/root.reducer';
import {effects} from './shared/store/states/root.effects';

import { AppComponent } from './app.component';
import {httpInterceptorService} from './interceptors/http-interceptor.service';
import {SharedModule} from './shared/shared.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {DynamicComponentManifest} from './dynamic-loader/dynamic-component-manifest';
import {DynamicComponentLoaderModule} from './dynamic-loader/dynamic-loader.module';


 const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'admin',
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
  },
];

export const ROUTES:Routes = [
{path:'',redirectTo:'posts',pathMatch:'full'},
{path:'auth',loadChildren:'./auth/auth.module#AuthModule'},
{path:'posts',loadChildren:'./post/post.module#PostModule'},
{path:'profile',loadChildren:'./profile/profile.module#ProfileModule'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,SharedModule.forRoot(),RouterModule.forRoot(ROUTES),
    HttpClientModule,SnotifyModule,NgbModule.forRoot(),
    DynamicComponentLoaderModule.forRoot(manifests),StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot(effects)
  ],
  providers: [httpInterceptorService,
  { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
