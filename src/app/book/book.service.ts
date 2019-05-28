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
  /**
   * Liste des livres mis en cache
   *
   * @private
   * @type {Book[]}
   * @memberof BookService
   */
  private books: Book[];

  constructor(private http: HttpClient, private cartService: CartService) { }
  /**
   * Retourner la liste des livres à partir de l'api
   *
   * @returns {Observable<Book[]>}
   * @memberof BookService
   */
  getBooks(): Observable<Book[]> {
    // Rechercher dans le cache la liste des livres
    if (this.books) {
      return of(this.books);
    }

    return this.http.get<Book[]>(this.booksUrl).pipe(
      tap(data => console.log(JSON.stringify(data))),
      tap(data => (this.books = data)),
      catchError(this.handleError)
    );
  }
  /**
   * Retourner la liste des offres commerciales à partir de l'api
   *
   * @returns {(Observable<any> | null)}
   * @memberof BookService
   */
  getOffreCommerciales(): Observable<any> | null {
    let booksIsbnList = '';
    // get cart book list from local storage
    const books = this.cartService.getBooksFromCart();

    if (!books || books.length == 0) { return null; }

    // Construire la liste des isbn pour le webservice
    books.forEach(book => {
      booksIsbnList += book.isbn + ',';
    })
    booksIsbnList = booksIsbnList.replace(/,$/, '');
    return this.http.get(this.booksUrl + '/' + booksIsbnList + '/commercialOffers');
  }
  /**
   * Gérer les erreurs http de l'api
   *
   * @private
   * @param {*} err
   * @returns
   * @memberof BookService
   */
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
