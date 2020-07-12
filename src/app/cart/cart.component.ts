import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { filter, scan, pluck, concatAll, withLatestFrom, switchMap, tap } from 'rxjs/operators';

import { Book } from '../book/book';
import { CartService } from './cart.service';
import { BookService } from '../book/book.service';
import { OffreCommerciale } from '../book/offre-commerciale.type';

@Component({
  selector: 'hp-cart',
  template: `
    <hp-cart-list
      [cartItems]="cartItems$ | async"
      [total]="totalPrice$ | async"
      [totalAfterDiscount]="totalAfterDiscount$ | async"
    ></hp-cart-list>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Book[]>;
  totalPrice$: Observable<number>;
  totalAfterDiscount$: Observable<number>;

  constructor(
    private cartService: CartService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    // get items from service
    this.cartItems$ = this.cartService.cartItems$;

    this.totalPrice$ = this.cartItems$.pipe(
      concatAll(),
      pluck('price'),
      scan((acc, price) => acc + price, 0)
    );



    this.totalAfterDiscount$ = this.bookService.getOffreCommerciales()
      .pipe(
        filter((offreCom: OffreCommerciale | null) => offreCom !== null),
        withLatestFrom(this.totalPrice$),
        switchMap(([offreCom, totalPrice]) =>
          of(
            this.cartService.calcBestOffer(
              offreCom.offers,
              totalPrice
            )
          )
        )
      );

  }

}
