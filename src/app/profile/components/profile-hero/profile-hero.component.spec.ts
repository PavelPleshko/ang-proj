import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeroComponent } from './profile-hero.component';

describe('ProfileHeroComponent', () => {
  let component: ProfileHeroComponent;
  let fixture: ComponentFixture<ProfileHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
