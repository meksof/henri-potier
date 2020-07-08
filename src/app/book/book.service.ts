import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book.type';
import { CartService } from '../cart/cart.service';
import { OffreCommerciale } from './offre-commerciale.type';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://henri-potier.xebia.fr/books';

  public books$ = this.getBooks();

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOffreCommerciales(): Observable<OffreCommerciale> | null {
    // get cart book list from local storage
    const books = this.cartService.getBooksFromCart();

    if (!books || books.length === 0) {
      return null;
    }

    return this.http.get<OffreCommerciale>(
      this.booksUrl + '/' + this.arrayToBookList(books) + '/commercialOffers'
    );
  }

  private arrayToBookList(books: Book[]) {
    let booksIsbnList = '';
    books.forEach(book => {
      booksIsbnList += book.isbn + ',';
    });
    booksIsbnList = booksIsbnList.replace(/,$/, '');
    return booksIsbnList;
  }

  private handleError(err) {
    let errorMessage: string;
    if (err && err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }

    return throwError(errorMessage);
  }
}
