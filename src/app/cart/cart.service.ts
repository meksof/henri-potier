import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Book } from '../book/book';
import { Offre } from '../book/offre-commerciale.type';

@Injectable()
export class CartService
{
    private _cartItems: Book[] = [];
    private _cartTotalPrice = 0;
    private get cartItems (): Book[]
    {
        return this._cartItems;
    }
    private set cartItems (value: Book[])
    {
        this._sCartItems.next(value);
        this._cartItems = value;
        this._cartTotalPrice = this._cartItems.reduce(
            (acc, book: Book) => acc + (book.price || 0), 0
        );
    }
    private readonly _sCartItems: Subject<Book[]> = new Subject();

    public readonly cartItems$ = this._sCartItems.asObservable().pipe(
        shareReplay()
    );
    public get cartTotalPrice ()
    {
        return this._cartTotalPrice;
    }

    /**
   * Ajouter un article au panier
   *
   */
    addBookToCart (book: Book): void
    {
        this.cartItems = [...this._cartItems, book];
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
