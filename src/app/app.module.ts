import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { BookService } from './book/book.service';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookModule,
    HttpClientModule,
    CartModule
  ],
  providers: [BookService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
