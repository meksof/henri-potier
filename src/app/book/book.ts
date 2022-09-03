export class Book
{
    isbn!: string;
    title!: string;
    price!: number;
    cover!: string;
    synopsis!: string[];
    isInCartItems?: boolean;
    description?: string;
    public static mapBook (source: Book, cartItems: Book[]): Book
    {
        const target = new Book();
        Object.assign(target, source);
        target.isInCartItems = cartItems.findIndex(ci => ci.isbn === source.isbn) !== -1;
        target.description = source?.synopsis ? source.synopsis[0] : '';
        return target;
    }
}
