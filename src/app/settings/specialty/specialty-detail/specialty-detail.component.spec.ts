import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyDetailComponent } from './specialty-detail.component';

describe('SpecialtyDetailComponent', () => {
  let component: SpecialtyDetailComponent;
  let fixture: ComponentFixture<SpecialtyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
