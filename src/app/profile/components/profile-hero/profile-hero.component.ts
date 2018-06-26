import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-profile-hero',
  templateUrl: './profile-hero.component.html',
  styleUrls: ['./profile-hero.component.scss']
})
export class ProfileHeroComponent implements OnInit {
@Input() user;

  constructor() { }

  ngOnInit() {
  }

}
