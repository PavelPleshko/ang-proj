import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTileSingleComponent } from './post-tile-single.component';

describe('PostTileSingleComponent', () => {
  let component: PostTileSingleComponent;
  let fixture: ComponentFixture<PostTileSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTileSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTileSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
