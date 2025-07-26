import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const { data } = await axios.get(`/api/comments`);
    return data
})

export const fetchCreateComments = createAsyncThunk('comments/fetchCreateComments', async (params) => {
    const { data } = await axios.post(`/api/comments`, params);
    return data
})

const initialState = {
    comments: {
        items: [],
        status: 'loading'
    }
}

export const commetnsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: {
        // Получение Комментов
        [fetchComments.pending]: (state) => {
            state.comments = [];
            state.comments.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments = {
                items: action.payload.rows,
                status: 'loaded'
            }
        },
        [fetchComments.rejected]: (state) => {
            state.comments = {
                items: [],
                status: 'error'
            }
        },

        // Создание Комментов
        [fetchCreateComments.pending]: (state) => {
            state.comments.status = 'loading';
        },
        [fetchCreateComments.fulfilled]: (state, action) => {
            state.comments = {
                items: action.payload.rows,
                status: 'loaded'
            }
        },
        [fetchCreateComments.rejected]: (state) => {
            state.comments = {
                items: [],
                status: 'error'
            }
        },

    }
})

// Action creators are generated for each case reducer function
export const { } = commetnsSlice.actions

export default commetnsSlice.reducer
