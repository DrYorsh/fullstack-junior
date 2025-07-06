import { configureStore } from '@reduxjs/toolkit';
import reducerPosts from './slices/post.slice'
import { authReduser } from './slices/auth.slice';
import  commReduser from './slices/comm.slice';


export const store = configureStore({
  reducer: {reducerPosts, authReduser, commReduser},
});

export default store;