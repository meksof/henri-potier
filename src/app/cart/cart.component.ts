import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, switchMap, map } from 'rxjs/operators';

import { Book } from '../book/book';
import { CartService } from './cart.service';
import { BookService } from '../book/book.service';
import { OffreCommerciale } from '../book/offre-commerciale.type';

@Component({
    selector: 'hp-cart',
    template: `
    <hp-cart-list
      [cartItems]="(cartItems$ | async)!"
      [total]="(totalPrice$ | async)!"
      [totalAfterDiscount]="(totalAfterDiscount$ | async)!"
    ></hp-cart-list>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit
{
    cartItems$: Observable<Book[]> = this.cartService.cartItems$;
    totalPrice$!: Observable<number>;
    totalAfterDiscount$!: Observable<number>;

    constructor (
        private cartService: CartService,
        private bookService: BookService
    )
    { }

    ngOnInit ()
    {
        this.totalPrice$ = this.cartService.cartTotalPrice$;

        this.totalAfterDiscount$ = this.bookService.getOffreCommerciales()
            .pipe(
                filter((offreCom: OffreCommerciale) => offreCom !== null),
                switchMap((offreCom: OffreCommerciale) =>
                    this.cartService.cartTotalPrice$.pipe(
                        map((totalPrice: number) => this.cartService.calcBestOffer(
                            offreCom.offers,
                            totalPrice
                        ))
                    )
                )
            );
    }
}
