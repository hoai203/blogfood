import { takeLatest } from "redux-saga/effects";
import { handleCreateComments, handleCreateCommentsAdmin, handleDeleteComment, handleDeleteCommentAdmin, handleGetAllComments, handleGetAllCommentsByPost, handleUpdateComment, handleUpdateCommentAdmin } from "./handles";
import { commentsRequest, createCommentsAdminRequest, createCommentsRequest, deleteCommentAdminRequest, deleteCommentRequest, getcommentsByPostRequest, updateCommentAdminRequest, updateCommentRequest } from "./commentsSlice";

export default function* commetsSagas() {
    yield takeLatest(commentsRequest.type, handleGetAllComments)
    yield takeLatest(createCommentsRequest.type, handleCreateComments)
    yield takeLatest(createCommentsAdminRequest.type, handleCreateCommentsAdmin)
    yield takeLatest(updateCommentRequest.type, handleUpdateComment)
    yield takeLatest(updateCommentAdminRequest.type, handleUpdateCommentAdmin)
    yield takeLatest(deleteCommentRequest.type, handleDeleteComment)
    yield takeLatest(deleteCommentAdminRequest.type, handleDeleteCommentAdmin)
    yield takeLatest(getcommentsByPostRequest.type, handleGetAllCommentsByPost)
}