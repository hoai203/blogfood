import { call, put } from "redux-saga/effects";
import { loginAuth, logoutAuth, registerAuth } from "./request";
import { requestFailure, loginSuccess, registerSuccess, setInfoAuth } from "./authSlice";
import { setErrorGlobal, setNotifyGlobal, toggleSignin } from "../global/globalSlice";

export function* authenticateCustomer({ payload }) {
    const { info, handleBackPage } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(loginAuth, info);
        if (response) {
            const { message, accessToken, ...info } = response.data
            yield put(setNotifyGlobal(message))
            yield put(loginSuccess(accessToken))
            yield put(setInfoAuth(info))
            yield handleBackPage()
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* registerCustomer({ payload }) {
    const { reset, ...info } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(registerAuth, info);
        if (response) {
            yield put(registerSuccess())
            yield put(setNotifyGlobal(response.data?.message))
            yield reset()
            yield put(toggleSignin())
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* logoutCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(logoutAuth, payload?.id);
        if (response) {
            yield put(setErrorGlobal(''));
            yield put(setNotifyGlobal(response.data?.message))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}

function* handleCommonError(error) {
    console.log("error auth:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}