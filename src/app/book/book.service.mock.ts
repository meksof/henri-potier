import { Observable, of } from 'rxjs';
import { Book } from './book.type';
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
  getBooks(): Observable<Book[]> {
    return of(books);
  }
}
