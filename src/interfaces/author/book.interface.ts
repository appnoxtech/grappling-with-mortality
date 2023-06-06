import { BookStatusEnum } from "../common/common";
import { Chapter } from "./chapter.interface";

export interface book {
  _id?: string,
  bookName: string;
  bookImage: string;
  description: string;
  authorName: string;
  authorImage: string;
  noOfPages: number;
  bookLink: string;
  chapters: any;
  publishStatus: BookStatusEnum,
  reason?: string
}

export interface Audio {
  _id?: string,
  audioLink: string,
  chapterName: string,

}

export interface bookDetails extends book {
  _id?: string,
  audio: Array<Audio>,
  audioId: string,
  authorId: string,
  chapters: Array<Chapter>,
}

// Author Reducer Interface and type

// ACTIONS TYPES
export const UPDATE_AUTHOR_BOOK_LIST = 'UPDATE_AUTHOR_BOOK_LIST';
export const UPDATE_NEW_BOOK_DETAILS = 'UPDATE_NEW_BOOK_DETAILS';
export const CLEAR_NEW_BOOK_DETAILS = 'CLEAR_NEW_BOOK_DETAILS';
export const UPDATE_SELECTED_BOOK = 'UPDATE_SELECTED_BOOK';
export const UPDATE_SELECTED_BOOK_DETAILS = 'UPDATE_SELECTED_BOOK_DETAILS';
export const UPDATE_CHAPTERS_LIST = 'UPDATE_CHAPTERS_LIST';
export const EDIT_NEW_BOOK = 'EDIT_NEW_BOOK';

export type NewBookUpdateKey =
  | 'bookName'
  | 'bookImage'
  | 'description'
  | 'authorName'
  | 'authorImage'
  | 'noOfPages'
  | 'bookLink';


export interface NewBookData {
  key: NewBookUpdateKey;
  value: string | number;
}

export interface UpdateBookList {
  type: 'UPDATE_AUTHOR_BOOK_LIST';
  payload: Array<book>;
}

export interface updateNewBookDetails {
  type: 'UPDATE_NEW_BOOK_DETAILS';
  payload: NewBookData;
}

export interface clearNewBookDetails {
  type: 'CLEAR_NEW_BOOK_DETAILS';
}

export interface updateSelectedBook {
  type: 'UPDATE_SELECTED_BOOK';
  payload: any;
}

export interface updateSelectedBookDetails {
  type: 'UPDATE_SELECTED_BOOK_DETAILS';
  payload: any;
}

export interface updateChapterList {
  type: 'UPDATE_CHAPTERS_LIST';
  payload: any;
}

export interface editNewBook {
  type: 'EDIT_NEW_BOOK'
}

export type action =
  | UpdateBookList
  | updateNewBookDetails
  | clearNewBookDetails
  | updateSelectedBook
  | updateSelectedBookDetails
  | updateChapterList
  | editNewBook;
