import { call, put } from "redux-saga/effects";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  FeedbackRequest,
  createFeedbacksSuccess,
  getFeedbackSuccess,
  requestFailure,
  resetPasswordSuccess,
  sendFeedbacksSuccess,
  forgotPasswordAdminSuccess,
  forgotPasswordSuccess,
  resetPasswordAdminSuccess,
  checkTokenSuccess,
} from "./feedbacksSlice";
import {
  checkToken,
  createFeedBack,
  getAllFeedBack,
  resetPassword,
  resetPasswordAdmin,
  sendEmail,
  sendPassword,
  sendPasswordAdmin,
} from "./request";
import { updateStatusRequest } from "../admin/adminSlice";
export function* handleCreateFeedback({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createFeedBack, payload?.feedback);
    if (response?.data) {
      yield put(createFeedbacksSuccess());
    }
    yield put(setNotifyGlobal(response?.data?.message));
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSendFeedback({ payload }) {
  const { id } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(sendEmail, payload);
    if (response?.data) {
      yield put(sendFeedbacksSuccess());
      yield put(
        updateStatusRequest({ id, model: "feedback", status: "approved" })
      );
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSendPassword({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(sendPassword, payload.user_name);
    if (response?.data) {
      yield put(forgotPasswordSuccess());
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleResetPassword({ payload }) {
  const { handleBack, password: newPassword, token } = payload;
  const password = { newPassword };
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(resetPassword, token, password);

    if (response?.data) {
      yield put(resetPasswordSuccess());
      yield handleBack();
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSendPasswordAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(sendPasswordAdmin, payload.user_name);
    if (response?.data) {
      yield put(forgotPasswordAdminSuccess());
      yield put(setNotifyGlobal(response?.data?.message));
      yield payload?.handleBack()
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleResetPasswordAdmin({ payload }) {
  const { handleBack, password: newPassword, token } = payload;
  const password = { newPassword };
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(resetPasswordAdmin, token, password);

    if (response?.data) {
      yield put(resetPasswordAdminSuccess());
      yield handleBack();
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCheckToken({ payload }) {
  const { token, handleBack } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(checkToken, token);

    if (response?.data) {
      yield put(checkTokenSuccess());
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    if (error) {
      yield handleBack();
    }
    yield handleCommonError(error);
  }
}

export function* handleGetAllFeedBack({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllFeedBack, payload);
    if (response?.data) {
      yield put(getFeedbackSuccess(response.data?.reverse()));
    } else {
      yield put(getFeedbackSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
function* handleCommonError(error) {
  console.log("error send mail:", error);
  if (error?.code === "ERR_NETWORK") {
    yield put(requestFailure(error));
    yield put(setErrorGlobal(error?.message));
  } else {
    yield put(requestFailure(error?.response?.data));
    yield put(setErrorGlobal(error?.response?.data?.message));
  }
}
