import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CartService } from './cart/cart.service';

@Component({
    selector: 'hp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    public title = 'henri-potier';
    public cartItemsSize$!: Observable<number>;

    constructor (private cartService: CartService)
    { }

    ngOnInit ()
    {
        this.cartItemsSize$ = this.cartService.cartItems$.pipe(
            startWith([]),
            map(ci => ci.length)
        );
    }
}
