export interface book {
    bookName: string;
    bookImage: string;
    description: string;
    authorName: string;
    authorImage: string;
    noOfPages: string;
    bookLink: string;
    chapters: any;
}

// Author Reducer Interface and type

// ACTIONS TYPES
export const UPDATE_AUTHOR_BOOK_LIST = 'UPDATE_AUTHOR_BOOK_LIST';

export interface UpdateBookList {
   type: 'UPDATE_AUTHOR_BOOK_LIST',
   payload: Array<book>
};

export type action = UpdateBookList