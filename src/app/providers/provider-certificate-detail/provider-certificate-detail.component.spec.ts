import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCertificateDetailComponent } from './provider-certificate-detail.component';

describe('ProviderCertificateDetailComponent', () => {
  let component: ProviderCertificateDetailComponent;
  let fixture: ComponentFixture<ProviderCertificateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCertificateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCertificateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
