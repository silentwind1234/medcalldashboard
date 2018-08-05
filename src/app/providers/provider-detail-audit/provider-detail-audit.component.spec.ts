import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetailAuditComponent } from './provider-detail-audit.component';

describe('ProviderDetailAuditComponent', () => {
  let component: ProviderDetailAuditComponent;
  let fixture: ComponentFixture<ProviderDetailAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
