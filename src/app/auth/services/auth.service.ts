import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {SnotifyService} from 'ng-snotify';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {take} from 'rxjs/operators';
const TOKEN_NAME = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl:string = environment.backendUrl;
currentUser:BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(
  	private http:HttpClient,private snotifyService:SnotifyService) { 
  	let token = this.getToken();
  	if(token){
  		let isTokenValid:boolean = this.isTokenValid(token);
  		if(isTokenValid){
  			this.authenticateUserWithToken(token);
  		}else{
  			this.removeToken();
  		}
  	}
  }

  getToken() {
    return JSON.parse(localStorage.getItem(TOKEN_NAME));
  }

  setToken(token: any): void {
  	token = JSON.stringify(token);
    localStorage.setItem(TOKEN_NAME, token);
  }

  removeToken(){
  	localStorage.setItem(TOKEN_NAME,null);
  }

  isTokenValid(token){
  	let expiration = new Date(token.expiresAt).getTime();
  	let now = new Date().getTime();
  	return expiration > now;
  }


  authenticateUser(data){
  	let url = `${this.baseUrl}signin`;
  	return this.http.post(url,data);
  }

  authenticateUserWithToken(token){
  	let url = `${this.baseUrl}signinwithtoken`;
  	  	let headers = new HttpHeaders({'Authorization':`Bearer ${token.hash}`});
  	this.http.post(url,null,{headers:headers}).pipe(take(1)).subscribe(user=>{
  		if(user){
  			this.setCurrentUser(user);
  		}
  	});
  }


  registerUser(data){
  	let url = `${this.baseUrl}register`;
  	return this.http.post(url,data);
  }

  checkIfExists(username:string){
  	let url = `${this.baseUrl}checkifexists`;
  	return this.http.post(url,{username:username});
  }

  setCurrentUser(user){
  	this.currentUser.next(user);
  }

  removeCurrentUser(){
  	this.currentUser.next(null);
  }

  logout(){
  	let user = this.currentUser.getValue();
  	let url = `${this.baseUrl}logout`;

  	this.removeCurrentUser();
  	this.removeToken();

  	this.snotifyService.success('Logged out successfully. Come again!','Logged out');

  }



}
