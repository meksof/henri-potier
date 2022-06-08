import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Book } from '../book/book';
import { CartService } from './cart.service';
import { BookService } from '../book/book.service';
import { OffreCommerciale } from '../book/offre-commerciale.type';

@Component({
    selector: 'hp-cart',
    template: `
    <hp-cart-list
      [cartItems]="(cartItems$ | async)!"
      [total]="totalPrice"
      [totalAfterDiscount]="(totalAfterDiscount$ | async)!"
    ></hp-cart-list>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit
{
    cartItems$!: Observable<Book[]>;
    totalPrice!: number;
    totalAfterDiscount$!: Observable<number>;

    constructor (
        private cartService: CartService,
        private bookService: BookService
    )
    { }

    ngOnInit ()
    {
        this.cartItems$  = this.cartService.cartItems$
            .pipe(
                tap(() =>
                {
                    this.totalPrice = this.cartService.cartTotalPrice;
                })
            );

        this.totalAfterDiscount$ = this.bookService.getOffreCommerciales()
            .pipe(
                filter((offreCom: OffreCommerciale) => offreCom !== null),
                map((offreCom: OffreCommerciale) =>
                    this.cartService.calcBestOffer(
                        offreCom.offers,
                        this.totalPrice
                    )
                )
            );
    }
}
