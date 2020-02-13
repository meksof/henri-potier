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
  filteredBooks: Book[];
  _filterList: string;

  @Output('onAddToCart') onAddToCart: EventEmitter<Book> = new EventEmitter();
  @Output('onRemoveFromCart') onRemoveFromCart: EventEmitter<
    Book
  > = new EventEmitter();

  @Input()
  get books(): Book[] {
    return this._books;
  }
  set books(value: Book[]) {
    this._books = value;
    this.filteredBooks = value;
  }

  @Input()
  get filterList(): string {
    return this._filterList;
  }
  set filterList(value: string) {
    this._filterList = value;
    this.filteredBooks = this.filterList
      ? this.performFilter(this.filterList)
      : this.books;
  }

  constructor(private cartService: CartService) {}

  performFilter(filterBy: string): Book[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.books.filter(
      (book: Book) =>
        book.title.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !==
        -1
    );
  }

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
