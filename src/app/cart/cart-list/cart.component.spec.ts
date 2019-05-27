import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { HttpClientModule } from '@angular/common/http';

fdescribe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartListComponent, CartListComponent],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 33.6 if offers = {percentage: 4} and total = 35', () => {
    expect(component.calcBestOffer([{
      type: "percentage",
      value: 4
    }], 35)).toBe(33.6);
  });

  it(`should return 50 if offers = {"type": "percentage", "value": 5},
    { "type": "minus", "value": 15 },
    { "type": "slice", "sliceValue": 100, "value": 12 }
    and total = 65`, () => {
      expect(component.calcBestOffer([
        { "type": "percentage", "value": 5 },
        { "type": "minus", "value": 15 },
        { "type": "slice", "sliceValue": 100, "value": 12 }
      ], 65)).toBe(50);
    });

  it(`should return 132 if offers = {"type": "percentage", "value": 8},
    { "type": "minus", "value": 30 },
    { "type": "slice", "sliceValue": 40, "value": 14 }
    and total = 188`, () => {
      expect(component.calcBestOffer([
        { "type": "percentage", "value": 8 },
        { "type": "minus", "value": 30 },
        { "type": "slice", "sliceValue": 40, "value": 14 }
      ], 188)).toBe(132);
    })
});
