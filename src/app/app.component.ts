import { Component } from "@angular/core";
import { CartService } from "./cart/cart.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "henri-potier";
  /**
   * Représente le nombre total d'articles dans le panier
   *
   * @memberof AppComponent
   */
  cartTotalItems$: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // get total cart items
    this.cartTotalItems$ = this.cartService.totalCartItems;
  }
}
