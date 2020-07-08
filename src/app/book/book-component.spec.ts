import { TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { BookServiceMock } from '../book/book.service.mock';

describe('BookComponent', () => {
  let component: BookComponent;
  let service: BookService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookComponent,
        { provide: BookService, useClass: BookServiceMock }
      ]
    });
    component = TestBed.get(BookComponent);
    service = TestBed.get(BookService);
  });

  it('should Load the books list from the service at component INIT', (done) => {
    const expectedResult: any = [
      {
        isbn: 'string',
        title: 'string',
        price: 20,
        cover: 'string',
        synopsis: ['string']
      }
    ];
    let returnedResult = {};
    component.books$.subscribe(books => {
      returnedResult = books;
      done();
    });
    expect(returnedResult).toEqual(expectedResult);
  });
});
