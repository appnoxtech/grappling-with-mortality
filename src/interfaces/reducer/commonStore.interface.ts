import { book } from "../author/book.interface";

export interface CommonStoreInterface {
    isLoading: boolean,
    bookList: Array<book>
    showEditorOptions: boolean,
    bottomNavigationDisplayProperty: 'flex' | 'none'
}