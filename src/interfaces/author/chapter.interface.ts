export type NewChapterKey =
  | 'chapterNo'
  | 'chapterName'
  | 'startingPageNo'
  | 'endingPageNo';

export interface Chapter {
  _id?: string;
  chapterName: string;
  chapterNo: number;
  endingPageNo: number;
  startingPageNo: number;
}

export interface NewChapterData {
  key: NewChapterKey;
  value: string | number;
}

export interface updateChapterDetails {
  type: 'UPDATE_CHAPTER_DETAILS';
  payload: NewChapterData;
}

export interface resetChapterDetails {
  type: 'RESET_CHAPTER_DETAILS';
}

export interface editChapterDetails {
  type: 'EDIT_CHAPTER_DETAILS';
  payload: Chapter;
}

export interface updateSelectedChapter {
  type: 'UPDATE_SELECTED_CHAPTER',
  payload: Chapter
}

export type ChapterActions =
  | updateChapterDetails
  | resetChapterDetails
  | editChapterDetails
  | updateSelectedChapter;
