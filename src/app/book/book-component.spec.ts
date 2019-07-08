import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { Observable, of } from 'rxjs';
import { Book } from './book';
import { BookModule } from './book.module';
import { CommonModule } from '@angular/common';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared/shared.module';
import { BookServiceMock } from '../book/book.service.mock';


describe('Book composant', () => {
    let component: BookComponent;
    let fixture: ComponentFixture<BookComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BookListComponent, BookFilterComponent, BookComponent],
            imports: [
                CommonModule,
                SharedModule
            ],
            providers: [{ provide: BookService, useClass: BookServiceMock }]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(BookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(component.books).toEqual([{
            isbn: 'string',
            title: 'string',
            price: 20,
            cover: 'string',
            synopsis: ['string']
        }]);
    });

    it('should inrement value by 1', () => {
        expect(component.incrementQuantity(1)).toBe(2);
    });

})