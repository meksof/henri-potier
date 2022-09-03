import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, map, startWith, } from 'rxjs/operators';
import { Book } from './book';
import { CartService } from '../cart/cart.service';
import { OffreCommerciale } from './offre-commerciale.type';
import { ErrorHandler } from '../shared/services/error-handler.service';

@Injectable()
export class BookService
{
    private apiUrl = 'http://henri-potier.xebia.fr/books';

    /**
   * Liste de tous les articles
   *
   */
    public books$ = this.getBooks()
        .pipe(
            switchMap((books: Book[]) =>
                this.cartService.cartItems$
                    .pipe(
                        startWith([]), // Démarrer avec un panier vide !
                        map((cartItems: Book[]) => books.map((book: Book) => Book.mapBook(book, cartItems)))
                    )
            )
        );

    /**
   * Le filtre de recherche appliqué à la liste des articles
   *
   */
    private bookFilter$ = new BehaviorSubject<string>('');
    public bookFilteredAction$ = this.bookFilter$.asObservable();
    constructor (
        private http: HttpClient,
        private cartService: CartService
    )
    { }

    getBooks (): Observable<Book[]>
    {
        return this.http.get<Book[]>(this.apiUrl)
            .pipe(
                catchError(ErrorHandler.Throw)
            );
    }

    getOffreCommerciales (): Observable<OffreCommerciale>
    {
        return this.cartService.cartItems$
            .pipe(
                filter((books: Book[]) => books.length > 0),
                switchMap((books: Book[]) =>
                    this.http.get<OffreCommerciale>(
                        `${this.apiUrl}/${this.implodeIsbnBookList(books)}/commercialOffers`
                    )
                )
            );

    }

    performFilter (filterBy: string)
    {
        this.bookFilter$.next(filterBy);
    }

    private implodeIsbnBookList (books: Book[])
    {
        return books.map(book => book.isbn).join(',');
    }

}
