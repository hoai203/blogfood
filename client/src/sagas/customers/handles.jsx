import { call, put } from "redux-saga/effects";
import { changePassword, getAllCustomers, getDetailCustomer, getDetailInfoAdmin, getSearch, updateCustomer } from "./request";
import { changePasswordSuccess, customerDetailRequest, customerDetailSuccess, customersRequest, customersSuccess, requestFailure, searchCategoriesSuccess, searchCustomersSuccess, searchPostsSuccess, updateCustomerSuccess } from "./customersSlice";
import { closeChangePassword, setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { setInfoAuth } from "../auth/authSlice";

export function* handleGetDetailCustomer({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getDetailCustomer, payload?.slug);
        if (response) {
            yield put(customerDetailSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleGetInfoAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getDetailInfoAdmin, payload?.id);
        if (response) {
            yield put(customerDetailSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleGetAllCustomers({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllCustomers, payload);
        if (response) {
            yield put(customersSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleSearchCustomers({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getSearch, payload?.key, payload?.model);
        if (response) {
            yield put(searchCustomersSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleSearchCategories({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getSearch, payload?.key, payload?.model);
        if (response) {
            yield put(searchCategoriesSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleSearchPosts({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getSearch, payload?.key, payload?.model);
        if (response) {
            yield put(searchPostsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleChangePassword({ payload }) {
    const { dataPassword, reset } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(changePassword, dataPassword);
        if (response) {
            yield put(changePasswordSuccess())
            yield put(setNotifyGlobal(response?.data.message));
            yield reset()
            yield put(closeChangePassword())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}


export function* handleUpdateCustomers({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateCustomer, payload?.id, payload?.info)
        if (response?.data) {
            const { message, ...info } = response.data
            yield put(updateCustomerSuccess())
            yield put(customersRequest());
            yield put(customerDetailRequest({ slug: info?.slug }))
            yield put(setInfoAuth(info))
            yield put(setNotifyGlobal(message));
            yield payload?.handleSetURL(info?.slug)
        } else {
            yield put(requestFailure('Có lỗi xảy ra!'));
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}


function* handleCommonError(error) {
    console.log("error:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}
