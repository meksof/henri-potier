import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Book } from '../book/book.type';
import { BehaviorSubject } from 'rxjs';

// key that is used to access the data in local storageconst
const STORAGE_KEY = 'local_cartitems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Le montant total du panier en tant que observable
   *
   */
  public totalCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.updateTotalCartItems();
  }
  /**
   * Mettre à jour la valeur du nombre total d'articles dans
   * le panier, et informer les autres composants que la valeur
   * a changé
   *
   */
  updateTotalCartItems(): void {
    // get array of books from local storage
    const currentBooks = this.getBooksFromCart();
    // update total items value
    this.totalCartItems.next(currentBooks.length);
  }
  /**
   * Ajouter un article au panier
   *
   */
  addBookToCart(book: Book): void {
    // get array of books from local storage
    const currentBooks = this.getBooksFromCart();
    // push new book to array
    currentBooks.push(book);
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBooks);
    this.updateTotalCartItems();
  }
  /**
   * Enlever un article du panier
   *
   */
  removeBookFromCart(book: Book): void {
    // get array of books from local storage
    let currentBooks = this.getBooksFromCart();
    // remove book from list
    currentBooks = currentBooks.filter(item => item.isbn !== book.isbn);
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, currentBooks);
    this.updateTotalCartItems();
  }
  /**
   * Retourner la liste des articles dans le panier
   *
   */
  getBooksFromCart(): Book[] {
    return this.storage.get(STORAGE_KEY) || [];
  }
  /**
   * Permet de savoir Si l'article existe ou non
   *
   */
  bookExistInCard(book: Book): boolean {
    const currentBooks = this.getBooksFromCart();
    return currentBooks.filter(item => item.isbn === book.isbn).length !== 0;
  }
}
