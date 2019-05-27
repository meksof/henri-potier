import { Injectable, Inject } from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Book } from "../book/book";
import { BehaviorSubject } from "rxjs";


// key that is used to access the data in local storageconst
const STORAGE_KEY = "local_cartitems";

@Injectable({
  providedIn: "root"
})
export class CartService {

  public totalCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.updateTotalCartItems();
  }

  updateTotalCartItems(): any {
    // get array of books from local storage
    const currentBooks = this.getBooksFromCart();
    // update total items value
    this.totalCartItems.next(currentBooks.length);
  }

  addBookToCart(book: Book) {
    // get array of books from local storage
    const currentBooks = this.getBooksFromCart();
    // push new book to array
    currentBooks.push(book);
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBooks);
    this.updateTotalCartItems();
  }

  removeBookFromCart(book: Book) {
    // get array of books from local storage
    let currentBooks = this.getBooksFromCart();
    // remove book from list
    currentBooks = currentBooks.filter(item => item.isbn !== book.isbn);
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBooks);
    this.updateTotalCartItems();
  }

  getBooksFromCart(): Book[] {
    return this.storage.get(STORAGE_KEY) || [];
  }

  bookExistInCard(book: Book): boolean {
    const currentBooks = this.getBooksFromCart();

    return currentBooks.filter(item => item.isbn === book.isbn).length !== 0;
  }
}
