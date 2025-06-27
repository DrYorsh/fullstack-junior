import { configureStore } from '@reduxjs/toolkit';
import reducerPosts from './slices/post.slice'
import { authReduser } from './slices/auth.slice';

export const store = configureStore({
  reducer: {reducerPosts, authReduser},
});

export default store;