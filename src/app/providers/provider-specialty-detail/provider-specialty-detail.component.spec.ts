import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSpecialtyDetailComponent } from './provider-specialty-detail.component';

describe('ProviderSpecialtyDetailComponent', () => {
  let component: ProviderSpecialtyDetailComponent;
  let fixture: ComponentFixture<ProviderSpecialtyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSpecialtyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSpecialtyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
