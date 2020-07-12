import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'hp-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemComponent {
  @Input() book: Book;
  @Output() addToCart: EventEmitter<Book> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<Book> = new EventEmitter();

  constructor(private cartService: CartService) { }

  addBookToCart() {
    this.addToCart.emit(this.book);
  }

  removeBookFromCart() {
    this.removeFromCart.emit(this.book);
  }
}
