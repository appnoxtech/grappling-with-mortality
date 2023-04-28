export interface book {
    bookName: string;
    bookImage: string;
    description: string;
    authorName: string;
    authorImage: string;
    noOfPages: number;
    bookLink: string;
    chapters: any;
}

// Author Reducer Interface and type

// ACTIONS TYPES
export const UPDATE_AUTHOR_BOOK_LIST = 'UPDATE_AUTHOR_BOOK_LIST';
export const UPDATE_NEW_BOOK_DETAILS = 'UPDATE_NEW_BOOK_DETAILS';

export type NewBookUpdateKey = 'bookName' | 'bookImage' | 'description' | 'authorName' | 'authorImage' | 'noOfPages' | 'bookLink';

export interface NewBookData {
    key: NewBookUpdateKey,
    value: string | number
}

export interface UpdateBookList {
   type: 'UPDATE_AUTHOR_BOOK_LIST',
   payload: Array<book>
};

export interface updateNewBookDetails {
    type: 'UPDATE_NEW_BOOK_DETAILS',
    payload: NewBookData
}

export interface clearNewBookDetails {
    type: 'CLEAR_NEW_BOOK_DETAILS',
}

export interface updateSelectedBook {
    type: 'UPDATE_SELECTED_BOOK',
    payload: any
}

export type action = UpdateBookList | updateNewBookDetails | clearNewBookDetails | updateSelectedBook