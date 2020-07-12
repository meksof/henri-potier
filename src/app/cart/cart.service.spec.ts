import { CartService } from './cart.service';
import { TestBed } from '@angular/core/testing';
import { BookService } from '../book/book.service';
import { BookServiceMock } from '../book/book.service.mock';

describe('Cart Service', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: BookService, useClass: BookServiceMock }
      ]
    });

    service = TestBed.inject<CartService>(CartService);
  });

  it('should return 33.6 if offers = {percentage: 4} and total = 35', () => {
    expect(
      service.calcBestOffer(
        [
          {
            type: 'percentage',
            value: 4
          }
        ],
        35
      )
    ).toBe(33.6);
  });

  it(`should return 50 if offers = {"type": "percentage", "value": 5},
        { "type": "minus", "value": 15 },
        { "type": "slice", "sliceValue": 100, "value": 12 }
        and total = 65`, () => {
    expect(
      service.calcBestOffer(
        [
          { type: 'percentage', value: 5 },
          { type: 'minus', value: 15 },
          { type: 'slice', sliceValue: 100, value: 12 }
        ],
        65
      )
    ).toBe(50);
  });

  it(`should return 132 if offers = {"type": "percentage", "value": 8},
        { "type": "minus", "value": 30 },
        { "type": "slice", "sliceValue": 40, "value": 14 }
        and total = 188`, () => {
    expect(
      service.calcBestOffer(
        [
          { type: 'percentage', value: 8 },
          { type: 'minus', value: 30 },
          { type: 'slice', sliceValue: 40, value: 14 }
        ],
        188
      )
    ).toBe(132);
  });
});
