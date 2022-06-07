import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BookService } from './book.service';

@Component({
    selector: 'hp-book',
    template: `
    <hp-book-filter
      (filterChange)="performFilter($event)"
      #filterCriteria
    ></hp-book-filter>
    <hp-book-list
      class="row mt-3"
    ></hp-book-list>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent
{

    constructor (
        private bookService: BookService
    )
    { }

    performFilter (filterBy: string): void
    {
        this.bookService.performFilter(filterBy);
    }
}
