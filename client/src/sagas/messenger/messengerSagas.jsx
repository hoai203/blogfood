import { takeLatest } from "redux-saga/effects";
import {
  handleCreateConvesation,
  handleGetConvesations,
  handleCreateMessage,
  handleGetMessage,
  handleGetNotifycation,
  handleFilterNotifycation,
  handleGetMessageUnRead,
} from "./handles";
import {
  conversationsRequest,
  currentChatRequest,
  messagesRequest,
  createMessagesRequest,
  createConversationsRequest,
  notificationRequest,
  filterNotificationRequest,
  messageUnReadRequest,
} from "./messengerSlice";

export default function* messengerSagas() {
  yield takeLatest(createConversationsRequest.type, handleCreateConvesation);
  yield takeLatest(conversationsRequest.type, handleGetConvesations);
  yield takeLatest(createMessagesRequest.type, handleCreateMessage);
  yield takeLatest(messagesRequest.type, handleGetMessage);
  yield takeLatest(notificationRequest.type, handleGetNotifycation);
  yield takeLatest(filterNotificationRequest.type, handleFilterNotifycation);
  yield takeLatest(messageUnReadRequest.type, handleGetMessageUnRead);
}
