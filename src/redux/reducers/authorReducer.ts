import { action, book, UPDATE_AUTHOR_BOOK_LIST, UpdateBookList } from "../../interfaces/author/book.interface";

const initialState = {
    bookList: []
}

const AuthorReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATE_AUTHOR_BOOK_LIST: {
            return {
                ...state,
                bookList: [...action.payload]
            }
        }
    
        default:
            return state;
    }
};

export default AuthorReducer;

export const UpdateAuthorBookList = (BookList: Array<book>): UpdateBookList => {
   return {
       type: 'UPDATE_AUTHOR_BOOK_LIST',
       payload: BookList
   }
};
