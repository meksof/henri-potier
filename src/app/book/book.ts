import { CartService } from '../cart/cart.service';

export class Book {
  isbn: string;
  title: string;
  price: number;
  cover: string;
  synopsis: string[];
  isInCartItems?: boolean;
  public static mapBook(source: Book, cartItems: Book[]): Book {
    const target = new Book();
    Object.assign(target, source);
    target.isInCartItems = cartItems.findIndex(ci => ci.isbn === source.isbn) !== -1;
    return target;
  }
}
