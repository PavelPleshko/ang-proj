import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCreateModalComponent } from './quick-create-modal.component';

describe('QuickCreateModalComponent', () => {
  let component: QuickCreateModalComponent;
  let fixture: ComponentFixture<QuickCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
