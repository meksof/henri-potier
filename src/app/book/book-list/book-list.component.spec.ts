import { TestBed } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { BookService } from '../book.service';
import { BookServiceMock } from '../book.service.mock';
import { CartService } from 'src/app/cart/cart.service';

describe('BookListComponent', () =>
{
    let component: BookListComponent;
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                BookListComponent,
                { provide: BookService, useClass: BookServiceMock },
                {
                    provide: CartService, useValue: jasmine.createSpyObj('CartService', {
                        addBookToCart: jasmine.createSpy()
                    })
                }
            ]
        });
        component = TestBed.inject<BookListComponent>(BookListComponent);
    });

    it('should Load the books list from the service at component INIT', (done) =>
    {
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

        component.books$.subscribe(books =>
        {
            returnedResult = books;
            done();
        });
        expect(returnedResult).toEqual(expectedResult);
    });
});
