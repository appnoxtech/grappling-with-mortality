import AuthReducer from './authReducer';
import UserReducer from './userReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  user: UserReducer,
  authDetails: AuthReducer
});

export const rootReducers = (state: any, action: any) => {
  return appReducer(state, action);
};