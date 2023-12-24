import axios from "../../axios-interceptor/api";
import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = "category";
export function getAllCaterories() {
  return axios.get(`/${COLLECTION_NAME}/getAllCategories`);
}
export function getDetailCategory(slug) {
  return axios.get(`/${COLLECTION_NAME}/detailBySlug?slug=${slug}`)
}
export function getAllCateroriesAdmin() {
  return admin.get(`/${COLLECTION_NAME}/getAllCategoriesAdmin`);
}
export function createCategoryAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/createCategory`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function updateCategoryAdmin(id, entity) {
  return admin.put(`/${COLLECTION_NAME}/updateCategory?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
// "Content-Type": "multipart/form-data",
