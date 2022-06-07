import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartComponent } from './cart.component';

@NgModule({
  declarations: [CartListComponent, CartComponent],
  imports: [CommonModule, CartRoutingModule]
})
export class CartModule { }
