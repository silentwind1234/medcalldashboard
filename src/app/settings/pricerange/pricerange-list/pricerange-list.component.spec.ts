import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricerangeListComponent } from './pricerange-list.component';

describe('PricerangeListComponent', () => {
  let component: PricerangeListComponent;
  let fixture: ComponentFixture<PricerangeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricerangeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricerangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
