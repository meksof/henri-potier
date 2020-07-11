import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.type';
import { CartService } from 'src/app/cart/cart.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  private _books: Book[];

  @Output() addToCart: EventEmitter<Book> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<Book> = new EventEmitter();

  @Input()
  get books(): Book[] {
    return this._books;
  }
  set books(value: Book[]) {
    this._books = value;
  }

  constructor(private cartService: CartService) { }

  addBookToCart($mouseEvent, book: Book) {
    if (book) {
      this.addToCart.emit(book);
    }
  }

  removeBookFromCart($mouseEvent, book: Book) {
    if (book) {
      this.removeFromCart.emit(book);
    }
  }

  bookAlreadyInCart(book: Book): boolean {
    return this.cartService.bookExistInCard(book);
  }
}
