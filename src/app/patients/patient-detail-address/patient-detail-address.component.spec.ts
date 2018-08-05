import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailAddressComponent } from './patient-detail-address.component';

describe('PatientDetailAddressComponent', () => {
  let component: PatientDetailAddressComponent;
  let fixture: ComponentFixture<PatientDetailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
