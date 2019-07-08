import { Observable, of } from "rxjs";
import { Book } from "./book";

export class BookServiceMock {
    getBooks(): Observable<Book[]> {
        let book: Book[] = [{
            isbn: 'string',
            title: 'string',
            price: 20,
            cover: 'string',
            synopsis: ['string']
        }]
        return of(book);
    }
}