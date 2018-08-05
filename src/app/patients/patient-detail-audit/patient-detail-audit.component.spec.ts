import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailAuditComponent } from './patient-detail-audit.component';

describe('PatientDetailAuditComponent', () => {
  let component: PatientDetailAuditComponent;
  let fixture: ComponentFixture<PatientDetailAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
