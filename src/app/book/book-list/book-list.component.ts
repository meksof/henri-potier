import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { Book } from '../book';
import { CartService } from 'src/app/cart/cart.service';
import { BookService } from '../book.service';

@Component({
    selector: 'hp-book-list',
    templateUrl: "./book-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent
{
    public books$: Observable<Book[]> = combineLatest([
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
