import { createSlice } from "@reduxjs/toolkit";
import { getObjectFromLocalStorage, removeObjectFromLocalStorage, saveObjectToLocalStorage } from "../../utils/localstorage";

const initialState = {
    token: getObjectFromLocalStorage('authToken') || null,
    infoAuth: getObjectFromLocalStorage('infoAuth') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        loginSuccess: (state, action) => {
            saveObjectToLocalStorage('authToken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        },
        logout: (state) => {
            removeObjectFromLocalStorage('authToken');
            removeObjectFromLocalStorage('infoAuth');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                infoAuth: null
            }
        },
        registerRequest: (state, action) => {
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: null,
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        refreshAccessTokenRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        refreshAccessTokenSuccess: (state, action) => {
            saveObjectToLocalStorage('authToken', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            }
        },
        setInfoAuth: (state, action) => {
            saveObjectToLocalStorage('infoAuth', action.payload)
            return {
                ...state,
                infoAuth: action.payload
            }
        },
        getInfoAuth: (state) => {
            return {
                ...state,
                token: getObjectFromLocalStorage('authToken') || null,
                infoAuth: getObjectFromLocalStorage('infoAuth') || null,
            }
        },
    }
})

export const { loginRequest, loginSuccess, logout, registerRequest, requestFailure, registerSuccess, refreshAccessTokenRequest, refreshAccessTokenSuccess, setInfoAuth, getInfoAuth } = authSlice.actions
export default authSlice.reducer