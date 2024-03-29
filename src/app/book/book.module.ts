import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookFilterComponent } from './book-filter/book-filter.component';
import { SharedModule } from '../shared/shared.module';
import { BookComponent } from './book.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';

@NgModule({
    declarations: [BookListComponent, BookFilterComponent, BookComponent, BookItemComponent],
    imports: [CommonModule, BookRoutingModule, SharedModule]
})
export class BookModule
{ }
