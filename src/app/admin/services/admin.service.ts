import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrl:string = environment.backendUrl;

  constructor(private http:HttpClient) { }


  checkIfExists(type:string,value:string):Observable<any>{
  	let headers = new HttpHeaders({'Authorization':''})
let url = `${this.baseUrl}checkunique/`;
if(type == 'category'){
	url+=`category/${value}`;
}else if(type == 'tag'){
	url+=`tag/${value}`;
}
return this.http.get(url,{headers:headers});
  }

  create(type:string,data:any):Observable<any>{
  	let headers = new HttpHeaders({'Authorization':''});
  	let url = `${this.baseUrl}`;
	url+=`${type}/new`;
	return this.http.post(url,data,{headers:headers});
  }
}
