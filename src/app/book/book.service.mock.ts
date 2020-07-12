import { Observable, of } from 'rxjs';
import { Book } from './book';
let books: Book[] = [
  {
    isbn: 'string',
    title: 'string',
    price: 20,
    cover: 'string',
    synopsis: ['string']
  }
];

export class BookServiceMock {
  books$ = this.getBooks();
  bookFilteredAction$ = of('');
  getBooks(): Observable<Book[]> {
    return of(books);
  }
}
