import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './authslice';
import postSlice from './postSlice';
import userSlice from './userSlice';
import searchSlice from './searchSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  posts: postSlice,
  user: userSlice,
  search: searchSlice,
});

export default rootReducer;
