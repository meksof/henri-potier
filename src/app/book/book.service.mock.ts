import { Observable, of } from 'rxjs';
import { Book } from './book';

export const fakeBooks: Book[] = [
    {
        isbn: 'string',
        title: 'string',
        price: 20,
        cover: 'string',
        synopsis: ['string']
    }
];

export class BookServiceMock
{
    books$ = this.getBooks();
    bookFilteredAction$ = of('');
    getBooks (): Observable<Book[]>
    {
        return of(fakeBooks);
    }
}
