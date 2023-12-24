import { createSlice } from "@reduxjs/toolkit";
import { getObjectFromLocalStorage, removeObjectFromLocalStorage, saveObjectToLocalStorage } from "../../utils/localstorage";

const initialState = {
    notifications: {},
    notificationsAdmin: {},
    notificationsAuthAdmin: {},
    loading: false,
    error: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getNotificationByCustomerRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getNotificationByCustomerSuccess: (state, action) => {
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                error: '',
            }
        },
        getNotificationByAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getNotificationByAdminSuccess: (state, action) => {
            return {
                ...state,
                notificationsAdmin: action.payload,
                loading: false,
                error: '',
            }
        },
        getNotificationByAuthAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getNotificationByAuthAdminSuccess: (state, action) => {
            return {
                ...state,
                notificationsAuthAdmin: action.payload,
                loading: false,
                error: '',
            }
        },
        getAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        getAllNotificationSuccess: (state, action) => {
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                error: '',
            }
        },
        deleteNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        deleteNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        deleteAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        deleteAllNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        deleteAllNotificationAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        deleteAllNotificationAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        addNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        addNotificationAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        addNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateNotificationAuthAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateNotificationAuthAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateNotificationAdminRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateNotificationAdminSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        updateAllNotificationRequest: (state) => {
            return {
                ...state,
                loading: true,
                error: ''
            }
        },
        updateAllNotificationSuccess: (state) => {
            return {
                ...state,
                loading: false,
                error: '',
            }
        },
        requestFailure: (state, action) => {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        },
        setNotification: (state) => {
            return {
                ...state,
                notifications: {}
            }
        }
    }
})

export const { addNotificationRequest, addNotificationSuccess, deleteNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getAllNotificationSuccess, getNotificationByCustomerRequest, getNotificationByCustomerSuccess, requestFailure, updateAllNotificationRequest, updateAllNotificationSuccess, updateNotificationRequest, updateNotificationSuccess, setNotification, deleteAllNotificationRequest, deleteAllNotificationSuccess, getNotificationByAdminRequest, getNotificationByAdminSuccess, updateNotificationAdminRequest, updateNotificationAdminSuccess, addNotificationAdminRequest, getNotificationByAuthAdminRequest, getNotificationByAuthAdminSuccess, deleteAllNotificationAdminRequest, deleteAllNotificationAdminSuccess, updateNotificationAuthAdminRequest, updateNotificationAuthAdminSuccess } = notificationSlice.actions
export default notificationSlice.reducer