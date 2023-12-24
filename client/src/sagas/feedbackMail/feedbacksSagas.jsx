import { takeLatest } from "redux-saga/effects";
import {
  handleCheckToken,
  handleCreateFeedback,
  handleGetAllFeedBack,
  handleResetPassword,
  handleResetPasswordAdmin,
  handleSendFeedback,
  handleSendPassword,
  handleSendPasswordAdmin,
} from "./handles";
import {
  FeedbackRequest,
  checkTokenRequest,
  createFeedbacksRequest,
  forgotPassworAdmindRequest,
  forgotPasswordRequest,
  resetPasswordAdminRequest,
  resetPasswordRequest,
  sendFeedbacksRequest,
} from "./feedbacksSlice";

export default function* feedSagas() {
  yield takeLatest(FeedbackRequest.type, handleGetAllFeedBack);
  yield takeLatest(createFeedbacksRequest.type, handleCreateFeedback);
  yield takeLatest(sendFeedbacksRequest.type, handleSendFeedback);
  yield takeLatest(forgotPasswordRequest.type, handleSendPassword);
  yield takeLatest(resetPasswordRequest.type, handleResetPassword);
  yield takeLatest(forgotPassworAdmindRequest.type, handleSendPasswordAdmin);
  yield takeLatest(resetPasswordAdminRequest.type, handleResetPasswordAdmin);
  yield takeLatest(checkTokenRequest.type, handleCheckToken);
}
