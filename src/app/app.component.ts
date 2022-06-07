import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'hp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'henri-potier';
  /**
   * Représente le nombre total d'articles dans le panier
   *
   */
  public cartTotalItems$: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartTotalItems$ = this.cartService.cartItems$.pipe(
      map(ci => ci.length)
    );
  }
}
