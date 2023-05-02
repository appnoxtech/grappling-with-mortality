import { book, bookDetails } from "../author/book.interface"

export interface AuthorStoreInterface { 
    bookList: Array<book>,
    newBook: book,
    selectedBook: book,
    selectedBookDetails: bookDetails,
}