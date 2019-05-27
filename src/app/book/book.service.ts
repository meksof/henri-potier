import { Injectable } from "@angular/core";
import { Book } from "./book";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { CartService } from "../cart/cart.service";

@Injectable({
  providedIn: "root"
})
export class BookService {
  private booksUrl = "http://henri-potier.xebia.fr/books";
  private books: Book[];

  constructor(private http: HttpClient, private cartService: CartService) { }

  getBooks(): Observable<Book[]> {
    if (this.books) {
      return of(this.books);
    }

    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => (this.books = data)),
      catchError(this.handleError)
    );
  }

  getOffreCommerciales(): Observable<any> {
    let booksIsbnList = '';
    // get cart book list from local storage
    const books = this.cartService.getBooksFromCart();
    // Construire la liste des isbn pour le webservice
    if (books) {
      books.forEach(book => {
        booksIsbnList += book.isbn + ',';
      })
      booksIsbnList = booksIsbnList.replace(/,$/, '');
    }
    // return of({
    //   "offers": [
    //     { "type": "percentage", "value": 5 },
    //     { "type": "minus", "value": 15 },
    //     { "type": "slice", "sliceValue": 100, "value": 12 }
    //   ]
    // })
    return this.http.get(this.booksUrl + '/' + booksIsbnList + '/commercialOffers');
  }

  private handleError(err) {
    let errorMessage: string;
    if (err && err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
