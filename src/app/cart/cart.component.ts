import { Component, OnInit } from "@angular/core";
import { Cart } from "./cart";
import { CartService } from "./cart.service";
import { BookService } from "../book/book.service";

@Component({
  selector: "app-cart",
  template: `
    <app-cart-list [cartItems]="cartItems" [total]="totalPrice" [totalAfterDiscount]="totalAfterDiscount"></app-cart-list>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: Cart[];
  totalPrice = 0;
  totalAfterDiscount = 0;

  constructor(private cartService: CartService, private bookService: BookService) { }

  ngOnInit() {
    // get items from service
    this.cartItems = this.cartService.getBooksFromCart();

    if (this.cartItems && this.cartItems.length > 0) {

      this.cartItems.forEach(item => {
        this.totalPrice += item.price;
      });

      this.bookService.getOffreCommerciales().subscribe(data => {
        // calc total from best offer
        this.totalAfterDiscount = this.calcBestOffer(data.offers, this.totalPrice);
      });

    }
  }
  /**
   * Calculer la meilleure offre commerciale
   *
   * @param {any[]} offers
   * @param {number} total
   * @returns {number} le total après remise
   * @memberof CartComponent
   */
  calcBestOffer(offers: any[], total: number): number {
    let totalPercentage: number;
    let totalMinus: number;
    let totalSlice: number;
    let bestOffer = 0;
    offers.forEach(offer => {
      if (offer.type == 'percentage') {
        totalPercentage = total - (total * offer.value / 100);
      } else if (offer.type == 'minus') {
        totalMinus = total - offer.value;
      } else if (offer.type == 'slice') {
        const X = (total - (total % offer.sliceValue)) / offer.sliceValue;
        totalSlice = total - (offer.value * X);
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