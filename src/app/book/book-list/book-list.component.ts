import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { Book } from '../book';
import { CartService } from 'src/app/cart/cart.service';
import { BookService } from '../book.service';

@Component({
    selector: 'hp-book-list',
    template: `
  <div class="col-xs-6 col-md-4 col-lg-3 col-xl-3 mt-2" *ngFor="let book of books$ | async">
    <hp-book-item [book]="book" (addToCart)="addBookToCart($event)" (removeFromCart)="removeBookFromCart($event)"></hp-book-item>
  </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent
{

    /**
   * Liste des articles
   *
   */
    public books$ = combineLatest([
        this.bookService.books$,
        this.bookService.bookFilteredAction$
    ]).pipe(
        map(([books, filterBy]) => books.filter((book: Book) =>
            filterBy ? book.title?.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1
                : true
        ))
    );

    constructor (
    private bookService: BookService,
    private cartService: CartService
    )
    { }


    addBookToCart (book: Book)
    {
        this.cartService.addBookToCart(book);
    }

    removeBookFromCart (book: Book)
    {
        this.cartService.removeBookFromCart(book);
    }
}
