import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
baseUrl:string = environment.backendUrl;

  constructor(private http:HttpClient) { }

  getMyProfile(){
  	let url:string =`${this.baseUrl}profiles/me`;
  	let headers = new HttpHeaders();
  	headers = headers.append('Authorization','');
  	return this.http.get(url,{headers:headers});
  }
}
