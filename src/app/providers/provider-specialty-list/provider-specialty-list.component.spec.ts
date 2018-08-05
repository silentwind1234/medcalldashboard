import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSpecialtyListComponent } from './provider-specialty-list.component';

describe('ProviderSpecialtyListComponent', () => {
  let component: ProviderSpecialtyListComponent;
  let fixture: ComponentFixture<ProviderSpecialtyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSpecialtyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSpecialtyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
