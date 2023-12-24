import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = 'comment'
export function getAllComments() {
    return axios.get(`/${COLLECTION_NAME}/getAllComments`)
}
export function getAllCommentsByPost(id) {
    return axios.get(`/${COLLECTION_NAME}/getAllCommentsByPost?id=${id}`)
}
export function createComments(entity) {
    return axios.post(`/${COLLECTION_NAME}/create`, entity)
}
export function updateComments(id, entity) {
    return axios.put(`/${COLLECTION_NAME}/updateComment?id=${id}`, entity)
}
export function deleteComment(id) {
    return axios.delete(`/${COLLECTION_NAME}/deleteComment?id=${id}`)
}
export function createCommentsAdmin(entity) {
    return admin.post(`/${COLLECTION_NAME}/create`, entity)
}
export function updateCommentsAdmin(id, entity) {
    return admin.put(`/${COLLECTION_NAME}/updateComment?id=${id}`, entity)
}
export function deleteCommentAdmin(id) {
    return admin.delete(`/${COLLECTION_NAME}/deleteComment?id=${id}`)
}
// "Content-Type": "multipart/form-data",
