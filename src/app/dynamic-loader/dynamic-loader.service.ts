import {Injectable,Inject,Injector,NgModuleFactoryLoader,ComponentFactory} from '@angular/core';
import {DynamicComponentManifest,DYNAMIC_COMPONENT_MANIFESTS,DYNAMIC_COMPONENT} from './dynamic-component-manifest';
import {Observable} from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class DynamicComponentLoaderService {

  constructor(
    @Inject(DYNAMIC_COMPONENT_MANIFESTS) private manifests: DynamicComponentManifest[],
    private loader: NgModuleFactoryLoader,private injector:Injector
  ) { }


  getComponentFactory<T>(componentId: string, injector?: Injector)
  : Observable<ComponentFactory<T>> {
  const manifest = this.manifests
    .find(m => m.componentId === componentId);
  
  const p = this.loader.load(manifest.loadChildren)
    .then(ngModuleFactory => {
      const moduleRef = ngModuleFactory.create(injector || this.injector);   
       const dynamicComponentType = moduleRef.injector.get(DYNAMIC_COMPONENT);
       return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(dynamicComponentType);
      // Problem! How do we get at the component this module provides?
    });

  return fromPromise(p);
}
}