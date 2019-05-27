import { Component, OnInit } from "@angular/core";
import { BookService } from "./book.service";
import { Book } from "./book";
import { CartService } from "../cart/cart.service";

@Component({
  selector: "app-book",
  template: `
    <app-book-filter
      (onFilterChange)="performFilter($event)"
      #filterCriteria
    ></app-book-filter>
    <app-book-list
      class="row mt-3"
      [filterList]="filterList"
      [books]="books"
      (onAddToCart)="addToCart($event)"
      (onRemoveFromCart)="removeFromCart($event)"
    ></app-book-list>
  `
})
export class BookComponent implements OnInit {
  filterList: string;
  books: Book[];

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  performFilter(filterBy: string) {
    this.filterList = filterBy;
  }

  addToCart(book: Book) {
    this.cartService.addBookToCart(book);
  }

  removeFromCart(book: Book) {
    this.cartService.removeBookFromCart(book);
  }
}
