import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreatePostModalComponent} from '../../../post/components/create-post-modal/create-post-modal.component';
import {QuickCreateModalComponent} from '../../../admin/components/quick-create-modal/quick-create-modal.component';

export interface createOption{
	title:string;
	//link:string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
createOptions:createOption[];

  constructor(private ngbModal:NgbModal) { }

  ngOnInit() {
  	this.createOptions = [
  		{title:'post'},{title:'category'},{title:'tag'}
  	];
  }


openModal(type:string):void{
	let ref;
	switch (type) {
		case "post":
			ref = this.ngbModal.open(CreatePostModalComponent,{size:'lg',centered:true});
			break;
		case "category":
			ref = this.ngbModal.open(QuickCreateModalComponent,{centered:true});
			break;
		case "tag":
			ref = this.ngbModal.open(QuickCreateModalComponent,{centered:true});			
			break;
	}

	ref.componentInstance.data = {type:type};
}


}
