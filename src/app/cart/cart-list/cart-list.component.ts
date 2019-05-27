import { Component, OnInit } from "@angular/core";
import { Cart } from "../cart";
import { CartService } from "../cart.service";
import { BookService } from "src/app/book/book.service";

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {
  cartItems: Cart[];
  totalPrice = 0;
  discount = '';
  totalAfterDiscount = 0;

  constructor(private cartService: CartService, private bookService: BookService) { }

  ngOnInit() {
    // get items from service
    this.cartItems = this.cartService.getBooksFromCart();

    this.cartItems.forEach(item => {
      this.totalPrice += item.price;
    });

    this.bookService.getOffreCommerciales().subscribe(data => {
      // calc total from best offer
      this.totalAfterDiscount = this.calcBestOffer(data.offers, this.totalPrice);
      // calc discount
      this.discount = (this.totalPrice - this.totalAfterDiscount).toFixed(2);
    });
  }

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
