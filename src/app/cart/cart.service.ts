import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatAll, pluck, scan } from 'rxjs/operators';
import { Book } from '../book/book';
import { Offre } from '../book/offre-commerciale.type';

@Injectable()
export class CartService {
  private _cartItems: Book[] = [];
  private cartItemsBS: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  public cartItems$ = this.cartItemsBS.asObservable();
  public cartTotalPrice$: Observable<number> = this.cartItems$.pipe(
    concatAll(),
    pluck('price'),
    scan((acc, price) => acc + price, 0),
  );

  /**
   * Ajouter un article au panier
   *
   */
  addBookToCart(book: Book): void {
    this._cartItems.push(book);
    this.cartItemsBS.next(this._cartItems);
  }

  /**
   * Enlever un article du panier
   *
   */
  removeBookFromCart(book: Book): void {
    // remove book from list
    this._cartItems = this._cartItems.filter(item => item.isbn !== book.isbn);
    this.cartItemsBS.next(this._cartItems);
  }

  /**
   * Calculer la meilleure offre commerciale
   *
   */
  calcBestOffer(offers: Offre[], total: number): number {
    let totalPercentage: number;
    let totalMinus: number;
    let totalSlice: number;
    let bestOffer = 0;
    offers.forEach((offer: Offre) => {
      if (offer.type === 'percentage') {
        totalPercentage = total - (total * offer.value) / 100;
      } else if (offer.type === 'minus') {
        totalMinus = total - offer.value;
      } else if (offer.type === 'slice') {
        const X = (total - (total % offer.sliceValue)) / offer.sliceValue;
        totalSlice = total - offer.value * X;
      }
    });

    if (totalMinus && totalSlice) {
      bestOffer = Math.min(totalPercentage, totalMinus, totalSlice);
    } else {
      bestOffer = totalPercentage;
    }

    return bestOffer;
  }
}
