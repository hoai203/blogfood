import { call, put } from "redux-saga/effects";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { addNotification, addNotificationAdmin, deleteAllNotificationByAdmin, deleteAllNotificationByCustomer, deleteNotificationByCustomer, getAllNotification, getNotificationByAdmin, getNotificationByAuthAdmin, getNotificationByCustomer, updateAllNotificationByAdmin, updateAllNotificationByCustomer, updateNotificationByAdmin, updateNotificationByCustomer } from "./request";
import { addNotificationSuccess, deleteAllNotificationAdminSuccess, deleteAllNotificationSuccess, deleteNotificationSuccess, getAllNotificationSuccess, getNotificationByAdminRequest, getNotificationByAdminSuccess, getNotificationByAuthAdminRequest, getNotificationByAuthAdminSuccess, getNotificationByCustomerRequest, getNotificationByCustomerSuccess, requestFailure, updateAllNotificationSuccess, updateNotificationAdminSuccess, updateNotificationAuthAdminSuccess, updateNotificationSuccess } from "./notificationSlice";


export function* handleAddNotification({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(addNotification, payload);
        if (response) {
            yield put(addNotificationSuccess())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleAddNotificationAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(addNotificationAdmin, payload);
        if (response) {
            yield put(addNotificationSuccess())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getNotificationByCustomer, payload);
        if (response) {
            yield put(getNotificationByCustomerSuccess(response.data?.reverse()))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetNotificationByAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getNotificationByAdmin, payload);
        if (response) {
            yield put(getNotificationByAdminSuccess(response.data?.reverse()))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetNotificationByAuthAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getNotificationByAuthAdmin, payload);
        if (response) {
            yield put(getNotificationByAuthAdminSuccess(response.data?.reverse()))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleAllGetNotification({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllNotification, payload);
        if (response) {
            yield put(getAllNotificationSuccess(response.data))
        }

    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateNotificationByCustomer, payload);
        if (response) {
            yield put(updateNotificationSuccess())
            yield put(getNotificationByCustomerRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateNotificationByAuthAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateAllNotificationByAdmin, payload);
        if (response) {
            yield put(updateNotificationAuthAdminSuccess())
            yield put(getNotificationByAuthAdminRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteNotificationByAuthAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteAllNotificationByAdmin, payload);
        if (response) {
            yield put(deleteAllNotificationAdminSuccess())
            yield put(getNotificationByAuthAdminRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateNotificationByAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateNotificationByAdmin, payload);
        if (response) {
            yield put(updateNotificationAdminSuccess())
            yield put(getNotificationByAdminRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateAllNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateAllNotificationByCustomer, payload);
        if (response) {
            yield put(updateAllNotificationSuccess())
            yield put(getNotificationByCustomerRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteNotificationByCustomer, payload);
        if (response) {
            yield put(deleteNotificationSuccess())
            yield put(getNotificationByCustomerRequest())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteAllNotificationByCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteAllNotificationByCustomer, payload);
        if (response) {
            yield put(deleteAllNotificationSuccess())
            yield put(getNotificationByCustomerRequest())

        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

function* handleCommonError(error) {
    console.log("error notification:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}