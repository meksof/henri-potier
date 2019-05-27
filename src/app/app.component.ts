import { Component } from "@angular/core";
import { CartService } from "./cart/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "henri-potier";
  cartTotalItems$ = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // get total cart items
    this.cartService.totalCartItems.subscribe((value: number) => {
      this.cartTotalItems$ = value;
    });
  }
}
