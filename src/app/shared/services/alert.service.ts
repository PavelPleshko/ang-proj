import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';



export interface MessageAlert{
	useExternal:boolean; //use external library
	title:string;
	body:string;
	type:'success' | 'error' | 'warning';
	elementId?:string;
	attr:string;
	timeout?:number;
}


@Injectable({
  providedIn: 'root'
})
export class AlertService {
message$:BehaviorSubject<MessageAlert> = new BehaviorSubject<MessageAlert>(null);

  constructor() { }


  pushMessage(msg:MessageAlert):void{
  	this.message$.next(msg);
  	let timeout:number = msg.timeout ? msg.timeout : 1000;
  	setTimeout(()=>{
  		this.removeMessage();
  	},timeout);
  }

  removeMessage():void{
  	this.message$.next(null);
  }
}
