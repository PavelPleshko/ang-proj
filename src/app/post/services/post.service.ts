import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
baseUrl:string = environment.backendUrl;

  constructor(private http:HttpClient) { }

  getPosts(opts?:any):Observable<any>{
  	let url = this.baseUrl;
  		url += 'posts/all';
  		let params = new HttpParams();
      for(let propName in opts){
              params = params.append(propName,opts[propName]);
      }
  	
  	return this.http.get(url,{params:params});
  }

  sendPost(data:any):Observable<any>{
  	let url = `${this.baseUrl}post/new`;
  	let headers = new HttpHeaders({'Authorization':''})
  	return this.http.post(url,data,{headers:headers});
  }


  doPostAction(type,postId):Observable<any>{
  	let headers = new HttpHeaders({'Authorization':''})
  	let url = `${this.baseUrl}post/${postId}/${type}`;

  	return this.http.post(url,null,{headers:headers});
  }

  getPostsByCategory(categoryId:string):Observable<any>{
  		let url = `${this.baseUrl}posts/filter-by`;
  	return this.http.post(url,{'category':[categoryId]});
  }

  getFilteredPosts(filterObj:any):Observable<any>{
      let url = `${this.baseUrl}posts/filter-by`;     
      return this.http.post(url,filterObj);
  }

   


}


