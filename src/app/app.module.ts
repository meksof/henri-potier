import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookModule } from "./book/book.module";
import { BookService } from "./book/book.service";
import { HttpClientModule } from "@angular/common/http";
import { CartModule } from "./cart/cart.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookModule,
    HttpClientModule,
    CartModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
