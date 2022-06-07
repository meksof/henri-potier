import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './cart/cart.service';

@Component({
    selector: 'hp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    public title = 'henri-potier';
    public cartItemsSize$: Observable<number> = of(0);

    constructor (private cartService: CartService)
    { }

    ngOnInit ()
    {
        this.cartItemsSize$ = this.cartService.cartItems$.pipe(
            map(ci => ci.length)
        );
    }
}
