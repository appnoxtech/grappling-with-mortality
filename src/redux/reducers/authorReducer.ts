import {
  action,
  book,
  CLEAR_NEW_BOOK_DETAILS,
  EDIT_NEW_BOOK,
  NewBookData,
  UPDATE_AUTHOR_BOOK_LIST,
  UPDATE_CHAPTERS_LIST,
  UPDATE_NEW_BOOK_DETAILS,
  UPDATE_SELECTED_BOOK,
  UPDATE_SELECTED_BOOK_DETAILS,
  UpdateBookList,
  updateNewBookDetails,
} from '../../interfaces/author/book.interface';
import { NewChapterData, updateChapterDetails } from '../../interfaces/author/chapter.interface';

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
  selectedBook: {},
  selectedBookDetails: {},
};

const AuthorReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case UPDATE_AUTHOR_BOOK_LIST: {
      return {
        ...state,
        bookList: [...action.payload],
      };
    }

    case UPDATE_NEW_BOOK_DETAILS: {
      return {
        ...state,
        newBook: {
          ...state.newBook,
          [action.payload.key]: action.payload.value,
        },
      };
    }

    case CLEAR_NEW_BOOK_DETAILS: {
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
        },
      };
    }

    case UPDATE_SELECTED_BOOK: {
      return {
        ...state,
        selectedBook: action.payload,
      };
    }

    case UPDATE_SELECTED_BOOK_DETAILS: {
      return {
        ...state,
        selectedBookDetails: action.payload,
      };
    }

    case EDIT_NEW_BOOK: {
      return {
        ...state,
        newBook: {...state.selectedBookDetails}
      };
    }

    default:
      return state;
  }
};

export default AuthorReducer;

export const UpdateAuthorBookList = (BookList: Array<book>): UpdateBookList => {
  return {
    type: 'UPDATE_AUTHOR_BOOK_LIST',
    payload: BookList,
  };
};

export const UpdateNewBookDetails = (
  bookData: NewBookData,
): updateNewBookDetails => {
  return {
    type: 'UPDATE_NEW_BOOK_DETAILS',
    payload: bookData,
  };
};

export const ClearNewBookDetails = () => {
  return {
    type: 'CLEAR_NEW_BOOK_DETAILS',
  };
};

export const UpdateSelectedBook = (bookData: any) => {
  return {
    type: 'UPDATE_SELECTED_BOOK',
    payload: bookData,
  };
};

export const UpdateSelectedBookDetails = (bookDetails: any) => {
  return {
    type: 'UPDATE_SELECTED_BOOK_DETAILS',
    payload: bookDetails,
  };
};

export const UpdateBookChaptersDetails = (chapterList: any) => {
  return {
    type: 'UPDATE_CHAPTERS_LIST',
    payload: chapterList,
  };
};

export const EditNewBook = () => {
  return {
    type: 'EDIT_NEW_BOOK',
  };
};

