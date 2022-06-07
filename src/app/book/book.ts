export class Book
{
    isbn: string | undefined;
    title: string | undefined;
    price: number | undefined;
    cover: string | undefined;
    synopsis: string[] | undefined;
    isInCartItems?: boolean;
    public static mapBook (source: Book, cartItems: Book[]): Book
    {
        const target = new Book();
        Object.assign(target, source);
        target.isInCartItems = cartItems.findIndex(ci => ci.isbn === source.isbn) !== -1;
        return target;
    }
}
