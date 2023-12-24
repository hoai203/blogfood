import { call, put } from "redux-saga/effects";
import { createComments, createCommentsAdmin, deleteComment, deleteCommentAdmin, getAllComments, getAllCommentsByPost, updateComments, updateCommentsAdmin } from "./request";
import { commentsRequest, createCommentsAdminSuccess, createCommentsSuccess, deleteCommentSuccess, getCommentsSuccess, getcommentsByPostRequest, getcommentsByPostSuccess, requestFailure, updateCommentSuccess } from "./commentsSlice";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import { addNotificationAdminRequest, addNotificationRequest } from "../notification/notificationSlice";

export function* handleGetAllComments({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllComments, payload);
        if (response) {
            yield put(getCommentsSuccess(response.data))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

export function* handleGetAllCommentsByPost({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(getAllCommentsByPost, payload?.id_post);
        if (response) {
            yield put(getcommentsByPostSuccess(response.data?.reverse()))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleCreateComments({ payload }) {
    const { comment, id_post, id_receiver, id_sender, typeNotify, id_customer_post } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(createComments, comment);
        if (response) {
            yield put(createCommentsSuccess(response.data.message))
            yield put(getcommentsByPostRequest({ id_post }))
            if (typeNotify === 'reply' && id_sender !== id_customer_post && id_receiver !== id_customer_post) {
                yield put(addNotificationRequest(
                    { id_post, id_comment: response.data._id, id_customer: id_customer_post, typeNotify: 'comment' }))
            }
            if (id_sender !== id_receiver) {
                yield put(addNotificationRequest(
                    { id_post, id_comment: response.data._id, id_customer: id_receiver, typeNotify }))
            }
            yield put(commentsRequest())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleCreateCommentsAdmin({ payload }) {
    const { comment, id_post, id_receiver, id_sender, typeNotify, id_customer_post } = payload
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(createCommentsAdmin, comment);
        if (response) {
            yield put(createCommentsAdminSuccess(response.data.message))
            yield put(getcommentsByPostRequest({ id_post }))
            if (typeNotify === 'reply' && id_sender !== id_customer_post && id_receiver !== id_customer_post) {
                yield put(addNotificationAdminRequest(
                    { id_post, id_comment: response.data._id, id_customer: id_customer_post, typeNotify: 'comment' }))
            }
            if (id_sender !== id_receiver) {
                yield put(addNotificationAdminRequest(
                    { id_post, id_comment: response.data._id, id_customer: id_receiver, typeNotify }))
            }
            yield put(commentsRequest())
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateComment({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateComments, payload?.id, payload?.comment);
        if (response) {
            yield put(updateCommentSuccess())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(commentsRequest())
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleUpdateCommentAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(updateCommentsAdmin, payload?.id, payload?.comment);
        if (response) {
            yield put(updateCommentSuccess())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(commentsRequest())
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteComment({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteComment, payload?.id);
        if (response) {
            yield put(deleteCommentSuccess())
            yield put(commentsRequest())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}
export function* handleDeleteCommentAdmin({ payload }) {
    try {
        yield put(setNotifyGlobal(''))
        yield put(setErrorGlobal(''))
        const response = yield call(deleteCommentAdmin, payload?.id);
        if (response) {
            yield put(deleteCommentSuccess())
            yield put(commentsRequest())
            yield put(getcommentsByPostRequest({ id_post: payload?.id_post }))
            yield put(setNotifyGlobal(response.data?.message))
        }
    } catch (error) {
        yield handleCommonError(error)
    }
}

function* handleCommonError(error) {
    console.log("error comment:", error)
    if (error?.code === 'ERR_NETWORK') {
        yield put(requestFailure(error));
        yield put(setErrorGlobal(error?.message));
    } else {
        yield put(setNotifyGlobal(''))
        yield put(requestFailure(error?.response?.data));
        yield put(setErrorGlobal(error?.response?.data?.message));
    }
}


// export function* registerCustomer({ payload }) {
//     try {
//         const response = yield call(registerAuth, payload);
//         if (response) {
//             yield put(registerSuccess())
//             toast.success(response.data?.message)
//         }

//     } catch (error) {
//         yield put(requestFailure(error.response.data.message));
//     }
// }