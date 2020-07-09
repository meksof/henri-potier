import { Component, OnDestroy } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.type';
import { CartService } from '../cart/cart.service';
import { Subject, combineLatest, forkJoin, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  template: `
    <app-book-filter
      (filterChange)="performFilter($event)"
      #filterCriteria
    ></app-book-filter>
    <app-book-list
      class="row mt-3"
      [books]="books$ | async"
      (addToCart)="addToCart($event)"
      (removeFromCart)="removeFromCart($event)"
    ></app-book-list>
  `
})
export class BookComponent implements OnDestroy {
  /**
   * Le filtre de recherche appliqué à la liste des articles
   *
   */
  private bookFilter$ = new BehaviorSubject<string>('');
  bookFilteredAction$ = this.bookFilter$.asObservable();
  /**
   * Liste des articles
   *
   */
  public books$ = combineLatest([
    this.bookService.books$,
    this.bookFilteredAction$
  ]).pipe(
    map(([books, filterBy]) => books.filter((book: Book) =>
      filterBy ? book.title.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1
        : true
    ))
  );

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ) { }

  performFilter(filterBy: string) {
    this.bookFilter$.next(filterBy);
  }

  addToCart(book: Book) {
    this.cartService.addBookToCart(book);
  }

  removeFromCart(book: Book) {
    this.cartService.removeBookFromCart(book);
  }

  ngOnDestroy(): void {
    this.bookFilter$.complete();
  }
}