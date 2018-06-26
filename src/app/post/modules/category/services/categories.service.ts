import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
baseUrl:string = environment.backendUrl;

  constructor(private http:HttpClient) { }


  getAllCategories(){
  	let url = `${this.baseUrl}categories/all`;
  	return this.http.get(url);
  }
}
