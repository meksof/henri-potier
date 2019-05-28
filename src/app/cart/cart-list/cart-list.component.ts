import { Component, OnInit, Input } from "@angular/core";
import { Cart } from "../cart";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  /**
   * La liste des Articles dans le panier
   *
   * @private
   * @type {Cart[]}
   * @memberof CartListComponent
   */
  private _cartItems: Cart[];
  @Input() get cartItems(): Cart[] {
    return this._cartItems;
  }
  set cartItems(v: Cart[]) {
    this._cartItems = v;
  }

  /**
   * Le montant total du panier
   *
   * @private
   * @memberof CartListComponent
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
   * @private
   * @type {number}
   * @memberof CartListComponent
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
   * @memberof CartListComponent
   */
  public discount = '';

  constructor() { }

  ngOnInit() {
  }


}
