import { TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { BookServiceMock } from '../book/book.service.mock';

describe('BookComponent', () => {
  let component: BookComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookComponent,
        { provide: BookService, useClass: BookServiceMock }
      ]
    });
    component = TestBed.get(BookComponent);
  });

  it('should Load the books list from the service at component INIT', () => {
    component.ngOnInit();

    expect(component.books).toEqual([
      {
        isbn: 'string',
        title: 'string',
        price: 20,
        cover: 'string',
        synopsis: ['string']
      }
    ]);
  });
});
