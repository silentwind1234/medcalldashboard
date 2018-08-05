import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCertificateListComponent } from './provider-certificate-list.component';

describe('ProviderCertificateListComponent', () => {
  let component: ProviderCertificateListComponent;
  let fixture: ComponentFixture<ProviderCertificateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCertificateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
