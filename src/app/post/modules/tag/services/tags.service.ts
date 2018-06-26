import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TagsService {
baseUrl:string = environment.backendUrl;

  constructor(private http:HttpClient) { }

   getAllTags(){
  	let url = `${this.baseUrl}tags/all`;
  	return this.http.get(url);
  }
}
