import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = 'customer'
export function getDetailCustomer(slug) {
    return axios.get(`/${COLLECTION_NAME}/detailBySlug?slug=${slug}`)
}
export function getDetailInfoAdmin(id) {
    return axios.get(`/${COLLECTION_NAME}/detailAdmin?id=${id}`)
}
export function getAllCustomers() {
    return axios.get(`/${COLLECTION_NAME}/getAll`)
}
export function getSearch(key, model) {
    return axios.get(`/${COLLECTION_NAME}/search?key=${key}&model=${model}`)
}
export function getAllCustomersByAdmin() {
    return admin.get(`/${COLLECTION_NAME}/getAllByAdmin`)
}
export function updateCustomer(id, entity) {
    return axios.put(`/${COLLECTION_NAME}/updateCustomer?id=${id}`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export function changePassword(entity) {
    return axios.put(`/${COLLECTION_NAME}/changePassword`, entity)
}
export function createCustomerAdmin(entity) {
    return admin.post(`/${COLLECTION_NAME}/createCustomer`, entity, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },