import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDetailBasicComponent } from './provider-detail-basic.component';

describe('ProviderDetailBasicComponent', () => {
  let component: ProviderDetailBasicComponent;
  let fixture: ComponentFixture<ProviderDetailBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderDetailBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderDetailBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
