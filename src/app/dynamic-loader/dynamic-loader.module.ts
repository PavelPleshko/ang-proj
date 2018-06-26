import {NgModule,ModuleWithProviders,
  SystemJsNgModuleLoader,NgModuleFactoryLoader,InjectionToken} from '@angular/core';
import {ROUTES} from '@angular/router';
import {DynamicComponentManifest,DYNAMIC_COMPONENT_MANIFESTS} from '../dynamic-loader/dynamic-component-manifest';
import {DynamicComponentLoaderService} from './dynamic-loader.service';


@NgModule({
  providers: [  { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }]
})
export class DynamicComponentLoaderModule {
  static forRoot(manifests: DynamicComponentManifest[]): ModuleWithProviders {
    return {
      ngModule: DynamicComponentLoaderModule,
      providers: [
      DynamicComponentLoaderService,
        { provide: ROUTES, useValue: manifests, multi: true },
          { provide: DYNAMIC_COMPONENT_MANIFESTS, useValue: manifests }
      ],
    };
  }
}