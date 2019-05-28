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
  /**
   * Le montant total du panier en tant que observable
   *
   * @type {BehaviorSubject<number>}
   * @memberof CartService
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
   * @returns {*}
   * @memberof CartService
   */
  updateTotalCartItems(): any {
    // get array of books from local storage
    const currentBooks = this.getBooksFromCart();
    // update total items value
    this.totalCartItems.next(currentBooks.length);
  }
  /**
   * Ajouter un article au panier
   *
   * @param {Book} book
   * @memberof CartService
   */
  addBookToCart(book: Book) {
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
   * @param {Book} book
   * @memberof CartService
   */
  removeBookFromCart(book: Book) {
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
   * @returns {Book[]}
   * @memberof CartService
   */
  getBooksFromCart(): Book[] {
    return this.storage.get(STORAGE_KEY) || [];
  }
  /**
   * Permet de savoir Si l'article existe ou non
   *
   * @param {Book} book
   * @returns {boolean}
   * @memberof CartService
   */
  bookExistInCard(book: Book): boolean {
    const currentBooks = this.getBooksFromCart();
    return currentBooks.filter(item => item.isbn === book.isbn).length !== 0;
  }
}
