import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = 'notification'
export function addNotification(entity) {
    return axios.post(`/${COLLECTION_NAME}/addNotification`, entity)
}
export function addNotificationAdmin(entity) {
    return admin.post(`/${COLLECTION_NAME}/addNotification`, entity)
}
export function getAllNotification() {
    return axios.get(`/${COLLECTION_NAME}/getAllNotification`,)
}
export function getNotificationByCustomer() {
    return axios.get(`/${COLLECTION_NAME}/getNotificationByCustomer`,)
}
export function getNotificationByAdmin() {
    return admin.get(`/${COLLECTION_NAME}/getNotificationByAdmin`,)
}
export function getNotificationByAuthAdmin() {
    return admin.get(`/${COLLECTION_NAME}/getNotificationByCustomer`,)
}
export function deleteNotificationByCustomer(id) {
    return axios.delete(`/${COLLECTION_NAME}/deleteNotification?id=${id}`,)
}
export function deleteAllNotificationByCustomer() {
    return axios.delete(`/${COLLECTION_NAME}/deleteAllNotificationByCustomer`)
}

export function updateAllNotificationByCustomer() {
    return axios.put(`/${COLLECTION_NAME}/updateAllNotificationByCustomer`, {})
}
export function deleteAllNotificationByAdmin() {
    return admin.delete(`/${COLLECTION_NAME}/deleteAllNotificationByCustomer`)
}

export function updateAllNotificationByAdmin() {
    return admin.put(`/${COLLECTION_NAME}/updateAllNotificationByCustomer`, {})
}
export function updateNotificationByCustomer(id) {
    return axios.put(`/${COLLECTION_NAME}/updateNotification?id=${id}`,)
}
export function updateNotificationByAdmin(id) {
    return admin.put(`/${COLLECTION_NAME}/updateNotificationAdmin?id=${id}`,)
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },