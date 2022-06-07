import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatAll, pluck, scan } from 'rxjs/operators';
import { Book } from '../book/book';
import { Offre } from '../book/offre-commerciale.type';

@Injectable()
export class CartService
{
    private _cartItems: Book[] = [];
    private get cartItems (): Book[]
    {
        this._sCartItems.next(this._cartItems);

        return this._cartItems;
    }
    private set cartItems (value: Book[])
    {
        this._cartItems = value;
    }
    private _sCartItems: Subject<Book[]> = new Subject();

    public cartItems$ = this._sCartItems.asObservable();
    public cartTotalPrice$: Observable<number> = this.cartItems$.pipe(
        concatAll(),
        pluck('price'),
        scan((acc, price) => acc + (price || 0), 0),
    );

    /**
   * Ajouter un article au panier
   *
   */
    addBookToCart (book: Book): void
    {
        this.cartItems.push(book);
    }

    /**
   * Enlever un article du panier
   *
   */
    removeBookFromCart (book: Book): void
    {
        this.cartItems = this.cartItems.filter(item => item.isbn !== book.isbn);
    }

    /**
   * Calculer la meilleure offre commerciale
   *
   */
    calcBestOffer (offers: Offre[], total: number): number
    {
        let totalPercentage = 0;
        let totalDiscount = 0;
        let totalSlice = 0;
        let bestOffer = 0;
        offers.map((offer: Offre) =>
        {
            if (offer.type === 'percentage')
            {
                totalPercentage = total - (total * offer.value) / 100;
            }
            else if (offer.type === 'minus')
            {
                totalDiscount = total - offer.value;
            }
            else if (offer.type === 'slice' && offer.sliceValue)
            {
                const X = (total - (total % offer.sliceValue)) / offer.sliceValue;
                totalSlice = total - offer.value * X;
            }
        });

        if (totalDiscount && totalSlice)
        {
            bestOffer = Math.min(totalPercentage, totalDiscount, totalSlice);
        }
        else
        {
            bestOffer = totalPercentage;
        }

        return bestOffer;
    }
}
