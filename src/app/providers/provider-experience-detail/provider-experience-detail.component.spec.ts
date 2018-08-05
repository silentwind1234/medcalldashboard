import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderExperienceDetailComponent } from './provider-experience-detail.component';

describe('ProviderExperienceDetailComponent', () => {
  let component: ProviderExperienceDetailComponent;
  let fixture: ComponentFixture<ProviderExperienceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderExperienceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
