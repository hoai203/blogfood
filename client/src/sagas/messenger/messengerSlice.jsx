import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  currentChat: [],
  messages: [],
  notificationMessage: [],
  messageUnRead: [],
  loading: false,
  error: null,
};

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    createConversationsRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    conversationsRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    conversationsSuccess: (state, action) => {
      return {
        ...state,
        conversations: action.payload,
        loading: false,
        error: null,
      };
    },
    currentChatRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    currentChatSuccess: (state, action) => {
      return {
        ...state,
        currentChat: action.payload,
        loading: false,
        error: null,
      };
    },
    createMessagesRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    messagesRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    messagesSuccess: (state, action) => {
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: null,
      };
    },
    notificationRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    notificationSuccess: (state, action) => {
      return {
        ...state,
        notificationMessage: action.payload,
        loading: false,
        error: null,
      };
    },
    filterNotificationRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    filterNotificationSuccess: (state, action) => {
      const filterNotify = state.notification?.filter(
        (notifi) => notifi._id !== action.payload
      );
      return {
        ...state,
        notificationMessage: filterNotify,
        loading: false,
        error: null,
      };
    },
    messageUnReadRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    messageUnReadSuccess: (state, action) => {
      return {
        ...state,
        loading: true,
        messageUnRead: action.payload,
        error: null,
      };
    },

    setLoadingMessage: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const {
  setLoadingMessage,
  conversationsRequest,
  conversationsSuccess,
  currentChatRequest,
  currentChatSuccess,
  messagesRequest,
  messagesSuccess,
  createConversationsRequest,
  createMessagesRequest,
  notificationRequest,
  notificationSuccess,
  filterNotificationRequest,
  filterNotificationSuccess,
  messageUnReadRequest,
  messageUnReadSuccess,
} = messengerSlice.actions;
export default messengerSlice.reducer;
