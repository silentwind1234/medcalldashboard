import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricerangeDetailComponent } from './pricerange-detail.component';

describe('PricerangeDetailComponent', () => {
  let component: PricerangeDetailComponent;
  let fixture: ComponentFixture<PricerangeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricerangeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricerangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
