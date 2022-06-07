import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book';

@Component({
    selector: 'hp-book-item',
    templateUrl: './book-item.component.html',
    styleUrls: ['./book-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemComponent
{
    @Input() book!: Book;
    @Output() addToCart: EventEmitter<Book> = new EventEmitter();
    @Output() removeFromCart: EventEmitter<Book> = new EventEmitter();

    addBookToCart ()
    {
        this.addToCart.emit(this.book);
    }

    removeBookFromCart ()
    {
        this.removeFromCart.emit(this.book);
    }
}
