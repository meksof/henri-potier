import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'hp-cart-link',
    templateUrl: './cart-link.component.html'
})
export class CartLinkComponent {
    @Input() size = 0;
}
