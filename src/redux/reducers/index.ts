import AuthReducer from './authReducer';
import AuthorReducer from './authorReducer';
import CommonReducer from './commonReducer';
import UserReducer from './userReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  user: UserReducer,
  authDetails: AuthReducer,
  author: AuthorReducer,
  common: CommonReducer
});

export const rootReducers = (state: any, action: any) => {
  return appReducer(state, action);
};