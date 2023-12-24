import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    commentsPost: [],
    loading: false,
    error: null,
    notify: '',
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getCommentsSuccess: (state, action) => {
            return {
                ...state,
                comments: action.payload,
                loading: false,
                error: null,
            }
        },
        getcommentsByPostRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        getcommentsByPostSuccess: (state, action) => {
            return {
                ...state,
                commentsPost: action.payload,
                loading: false,
                error: null,
            }
        },
        createCommentsRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        createCommentsSuccess: (state, action) => {
            return {
                ...state,
                notify: action.payload,
                loading: false,
                error: null,
            }
        },
        createCommentsAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        createCommentsAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        updateCommentRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateCommentAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        updateCommentSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        deleteCommentRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deleteCommentAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        deleteCommentSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        setNotify: (state) => {
            return {
                ...state,
                notify: '',
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
    }
})

export const { getCommentsSuccess, commentsRequest, requestFailure, createCommentsRequest, createCommentsSuccess, setNotify, updateCommentRequest, updateCommentSuccess, deleteCommentRequest, deleteCommentSuccess, getcommentsByPostRequest, getcommentsByPostSuccess, createCommentsAdminRequest, createCommentsAdminSuccess, deleteCommentAdminRequest, updateCommentAdminRequest } = commentsSlice.actions
export default commentsSlice.reducer