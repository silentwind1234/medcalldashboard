import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetailAddressComponent } from './provider-detail-address.component';

describe('ProviderDetailAddressComponent', () => {
  let component: ProviderDetailAddressComponent;
  let fixture: ComponentFixture<ProviderDetailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
