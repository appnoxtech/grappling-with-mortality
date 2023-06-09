import AudioEbookReducers from './audioEbookReducer';
import AuthReducer from './authReducer';
import AuthorReducer from './authorReducer';
import ChapterReducer from './chaptersReducer';
import CommonReducer from './commonReducer';
import EbookReaderReducer from './eBookReaderReducer';
import UserReducer from './userReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  user: UserReducer,
  authDetails: AuthReducer,
  author: AuthorReducer,
  common: CommonReducer,
  chapter: ChapterReducer,
  audio: AudioEbookReducers,
  bookReader: EbookReaderReducer
});

export const rootReducers = (state: any, action: any) => {
  return appReducer(state, action);
};