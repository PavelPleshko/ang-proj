import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {of} from 'rxjs/observable/of';
import {delay,mergeMap,tap} from 'rxjs/operators';
import {AuthService} from '../auth/services/auth.service';
import {SnotifyService} from 'ng-snotify';



@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService,private snotifyService:SnotifyService) { }

  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  	return of(null).pipe(mergeMap(()=>{
  		return this.handleRequest(request,next);
  	})
       )
        
  }


  handleRequest(request:HttpRequest<any>,next:HttpHandler):Observable<any>{

if(request.headers.has('Authorization')){
let bearer = this.getBearerAuthStr();
if(bearer){
 let newRequest = request.clone({headers:request.headers.set('Authorization', `${bearer}`)});
  return next.handle(newRequest);
}

}
  		return next.handle(request).pipe(tap((event)=>{},(err)=>{
       if(err){
         this.snotifyService.error(err.error.message,`Error ${err.status}`,{
           showProgressBar:false,
           timeout:4000
         });
       }
      }));
 
  }

  getBearerAuthStr(){
    let bearerStr = null;
    let token = this.getToken();
    let tokenValid = this.isTokenValid(token)
if(tokenValid){
  bearerStr=`Bearer ${token.hash}`;
}
    return bearerStr;
  }

 private getToken() {
    return JSON.parse(localStorage.getItem('jwt_token'));
  }

 private isTokenValid(token){
    let expiration = new Date(token.expiresAt).getTime();
    let now = new Date().getTime();
    return expiration > now;
  }

}


export const httpInterceptorService = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
};