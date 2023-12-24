import { call, put } from "redux-saga/effects";
import {
  createConversation,
  createMessage,
  getConversation,
  getMessage,
} from "./request";
import {
  conversationsRequest,
  conversationsSuccess,
  currentChatRequest,
  currentChatSuccess,
  messagesRequest,
  messagesSuccess,
  notificationSuccess,
  filterNotificationRequest,
  filterNotificationSuccess,
  messageUnReadRequest,
  messageUnReadSuccess,
  setLoadingMessage,
} from "./messengerSlice";

export function* handleCreateConvesation({ payload }) {
  // console.log("🚀 --> function*handleCreateConvesation --> payload:", payload);
  try {
    const response = yield call(createConversation, payload);
    if (response) {
      // yield put(customerDetailSuccess(response.data))
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetConvesations({ payload }) {
  try {
    const response = yield call(getConversation, payload?.userId);

    if (response) {
      yield put(conversationsSuccess(response?.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleCreateMessage({ payload }) {
  try {
    const response = yield call(createMessage, payload);
    if (response) {
      // yield put(conversationsSuccess(response.data));
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetMessage({ payload }) {
  try {
    const response = yield call(getMessage, payload?.conversationId);
    if (response) {
      yield put(messagesSuccess(response.data));
      // console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetNotifycation({ payload }) {
  try {
    if (payload) {
      yield put(notificationSuccess(payload));
      // console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleFilterNotifycation({ payload }) {
  try {
    if (payload) {
      yield put(filterNotificationSuccess(payload));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetMessageUnRead({ payload }) {
  // console.log("🚀 --> function*handleGetMessageUnRead --> payload:", payload);
  const { conversations, infoId } = payload;
  let messageUnRead = [];
  try {
    for (const conversation of conversations) {
      const response = yield call(getMessage, conversation?._id);

      if (response) {
        // Xử lý response theo cách bạn muốn
        const messageConversation = response?.data?.filter((item) =>
          item?.isRead?.every((userId) => userId !== infoId)
        );

        messageUnRead.push(...messageConversation);
      }
    }
    yield put(messageUnReadSuccess(messageUnRead));
  } catch (error) {
    console.log(error);
  }
}
