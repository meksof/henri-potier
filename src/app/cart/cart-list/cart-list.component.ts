import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../../book/book';

@Component({
  selector: 'hp-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent {
  /**
   * La liste des Articles dans le panier
   *
   */
  private _cartItems: Book[];
  @Input() get cartItems(): Book[] {
    return this._cartItems;
  }
  set cartItems(v: Book[]) {
    this._cartItems = v;
  }

  /**
   * Le montant total du panier
   *
   */
  private _total;
  @Input() get total(): number {
    return this._total;
  }
  set total(value: number) {
    this._total = value;
  }

  /**
   * Le montant total du panier après Remise
   *
   */
  private _totalAfterDiscount: number;
  @Input() get totalAfterDiscount(): number {
    return this._totalAfterDiscount;
  }
  set totalAfterDiscount(v: number) {
    this._totalAfterDiscount = v;
    // calc discount
    this.discount = (this._total - this._totalAfterDiscount).toFixed(2);
  }

  /**
   * Le montant de la remise
   *
   */
  public discount = '';

  constructor() { }

}
