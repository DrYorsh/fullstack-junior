import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (orderBy) => {
    const { data } = await axios.get(`/posts/sort/${orderBy}`);
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data
})

export const fetchRemoveTags = createAsyncThunk('posts/fetchRemoveTags', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data
})

export const fetchTagsOfPosts = createAsyncThunk('posts/fetchTagsOfPosts', async (params) => {
    const { data } = await axios.get(`/tags/${params}`);
    return data
})


const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading',
        ofPosts: []
    },
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Создание Постов
        [fetchPosts.pending]: (state) => {
            state.posts = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = {
                items: action.payload.rows,
                status: 'loaded'
            }
        },
        [fetchPosts.rejected]: (state) => {
            state.posts = {
                items: [],
                status: 'error'
            }
        },

        // Создание Тегов
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags = {
                items: action.payload,
                status: 'loaded'
            }
        },
        [fetchTags.rejected]: (state) => {
            state.tags = {
                items: [],
                status: 'error'
            }
        },

        // Удаление поста
        [fetchRemoveTags.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj.id !== action.meta.arg)
        },

        // Список постов по Тегам
        [fetchTagsOfPosts.pending]: (state) => {
            state.tags.status = 'loading';
        },
        [fetchTagsOfPosts.fulfilled]: (state, action) => {
            state.tags = {
                ofPosts: action.payload,
                status: 'loaded'
            }
        },
        [fetchTagsOfPosts.rejected]: (state) => {
            state.tags = {
                ofPosts: [],
                status: 'error'
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { } = postSlice.actions

export default postSlice.reducer