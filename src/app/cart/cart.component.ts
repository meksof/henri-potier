import { Component, OnInit } from '@angular/core';
import { Cart } from './cart';
import { CartService } from './cart.service';
import { BookService } from '../book/book.service';
import { OffreCommerciale, Offre } from '../book/offre-commerciale.type';

@Component({
  selector: 'app-cart',
  template: `
    <app-cart-list
      [cartItems]="cartItems"
      [total]="totalPrice"
      [totalAfterDiscount]="totalAfterDiscount"
    ></app-cart-list>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: Cart[];
  totalPrice = 0;
  totalAfterDiscount = 0;

  constructor(
    private cartService: CartService,
    private bookService: BookService
  ) { }

  ngOnInit() {
    // get items from service
    this.cartItems = this.cartService.getBooksFromCart();

    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        this.totalPrice += item.price;
      });

      this.bookService.getOffreCommerciales().subscribe(offreComm => {
        // calc total from best offer
        this.totalAfterDiscount = this.cartService.calcBestOffer(
          offreComm.offers,
          this.totalPrice
        );
      });
    }
  }
  /**
   * Calculer la meilleure offre commerciale
   *
   */

}
