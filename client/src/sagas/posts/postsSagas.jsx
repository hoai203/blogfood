import { takeLatest } from "redux-saga/effects";
import { handleCreatePosts, handleGetAllPosts, handleGetAllPostsByCategory, handleGetAllPostsByCustomer, handleGetDetailPosts, handleGetSearchPosts, handleLikePost, handleUpdatePost, handlehandleDeletePosts } from "./handles";
import { createPostsRequest, getPostsByCategoryRequest, getPostsByCustomerRequest, likePostRequest, postDetailRequest, postsRequest, searchPostsRequest, updatePostRequest } from "./postsSlice";
import { deleteAdminRequest } from "../admin/adminSlice";

export default function* postsSagas() {
    yield takeLatest(postsRequest.type, handleGetAllPosts)
    yield takeLatest(likePostRequest.type, handleLikePost)
    yield takeLatest(postDetailRequest.type, handleGetDetailPosts)
    yield takeLatest(searchPostsRequest.type, handleGetSearchPosts)
    yield takeLatest(createPostsRequest.type, handleCreatePosts)
    yield takeLatest(updatePostRequest.type, handleUpdatePost)
    yield takeLatest(getPostsByCategoryRequest.type, handleGetAllPostsByCategory)
    yield takeLatest(getPostsByCustomerRequest.type, handleGetAllPostsByCustomer)
    yield takeLatest(deleteAdminRequest.type, handlehandleDeletePosts)
}