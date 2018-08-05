import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderExperienceListComponent } from './provider-experience-list.component';

describe('ProviderExperienceListComponent', () => {
  let component: ProviderExperienceListComponent;
  let fixture: ComponentFixture<ProviderExperienceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderExperienceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderExperienceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
