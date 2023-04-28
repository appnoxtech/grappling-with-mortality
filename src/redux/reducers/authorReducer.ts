import { action, book, NewBookData, UPDATE_AUTHOR_BOOK_LIST, UPDATE_NEW_BOOK_DETAILS, UpdateBookList, updateNewBookDetails } from "../../interfaces/author/book.interface";

const initialState = {
    bookList: [],
    newBook: {
        bookName: '',
        bookImage: '',
        description: '',
        authorName: '',
        authorImage: '',
        noOfPages: '',
        bookLink: '',
    },
    selectedBook: {}
}

const AuthorReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case UPDATE_AUTHOR_BOOK_LIST: {
            return {
                ...state,
                bookList: [...action.payload]
            }
        }

        case UPDATE_NEW_BOOK_DETAILS: {
            return {
               ...state,
               newBook: {
                 ...state.newBook,
                 [action.payload.key]: action.payload.value
               }
            }
        }

        case 'CLEAR_NEW_BOOK_DETAILS': {
            return {
                ...state,
                newBook: {
                    bookName: '',
                    bookImage: '',
                    description: '',
                    authorName: '',
                    authorImage: '',
                    noOfPages: '',
                    bookLink: '',
                }
            }
        }

        case 'UPDATE_SELECTED_BOOK': {
            return {
                ...state,
                selectedBook: action.payload
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

export const UpdateNewBookDetails = (bookData: NewBookData): updateNewBookDetails => {
   return {
     type: 'UPDATE_NEW_BOOK_DETAILS',
     payload: bookData
   }
}

export const ClearNewBookDetails = () => {
    return {
        type: 'CLEAR_NEW_BOOK_DETAILS'
    }
}

export const UpdateSelectedBook = (bookData: any) => {
    return {
        type: 'UPDATE_SELECTED_BOOK',
        payload: bookData
    }
}
