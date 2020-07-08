import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.type';
import { CartService } from 'src/app/cart/cart.service';

// tslint:disable: no-output-rename
// tslint:disable: no-output-on-prefix

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  private _books: Book[];

  @Output('addToCart') onAddToCart: EventEmitter<Book> = new EventEmitter();
  @Output('removeFromCart') onRemoveFromCart: EventEmitter<Book> = new EventEmitter();

  @Input()
  get books(): Book[] {
    return this._books;
  }
  set books(value: Book[]) {
    this._books = value;
  }

  constructor(private cartService: CartService) { }

  addToCart($mouseEvent, book: Book) {
    if (book) {
      this.onAddToCart.emit(book);
    }
  }

  removeFromCart($mouseEvent, book: Book) {
    if (book) {
      this.onRemoveFromCart.emit(book);
    }
  }

  bookAlreadyInCart(book: Book): boolean {
    return this.cartService.bookExistInCard(book);
  }
}
