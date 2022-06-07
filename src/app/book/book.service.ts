import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, combineLatest } from 'rxjs';
import { catchError, filter, switchMap, map, } from 'rxjs/operators';
import { Book } from './book';
import { CartService } from '../cart/cart.service';
import { OffreCommerciale } from './offre-commerciale.type';

@Injectable()
export class BookService {
  private booksUrl = 'http://henri-potier.xebia.fr/books';

  /**
   * Liste de tous les articles
   *
   */
  public books$ = this.getBooks().pipe(
    switchMap((books: Book[]) => this.cartService.cartItems$.pipe(
      map((cartItems: Book[]) => books.map((book: Book) => Book.mapBook(book, cartItems)))
    ))
  );

  /**
   * Le filtre de recherche appliqué à la liste des articles
   *
   */
  private bookFilter$ = new BehaviorSubject<string>('');
  public bookFilteredAction$ = this.bookFilter$.asObservable();
  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOffreCommerciales(): Observable<OffreCommerciale> {
    // get cart book list from local storage
    return this.cartService.cartItems$.pipe(
      filter((books: Book[]) => books.length > 0),
      switchMap((books: Book[]) =>
        this.http.get<OffreCommerciale>(
          this.booksUrl + '/' + this.implodeIsbnBookList(books) + '/commercialOffers'
        )
      )
    );

  }

  performFilter(filterBy: string) {
    this.bookFilter$.next(filterBy);
  }

  private implodeIsbnBookList(books: Book[]) {
    return books.map(book => book.isbn).join(',');
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err && err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    return throwError(errorMessage);
  }
}
