import admin from "../../axios-interceptor/admin";
const COLLECTION_NAME = "admin";
export function loginAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/login`, entity);
}
export function registerAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/register`, entity);
}
export function logoutAdmin(id) {
  return admin.post(`/${COLLECTION_NAME}/logoutAdmin?id=${id}`);
}
export function getAllPostAdmin() {
  return admin.get(`/${COLLECTION_NAME}/getAllPostByAdmin`);
}
export function getListAdmin() {
  return admin.get(`/${COLLECTION_NAME}/getListAdmin`);
}
export function getSearchAdmin(model, key) {
  return admin.get(`/${COLLECTION_NAME}/searchAdmin?model=${model}&key=${key}`);
}
export function getStatistical(model) {
  return admin.get(`/${COLLECTION_NAME}/statistical?model=${model}`);
}
export function updateStatus(id, model, entity) {
  return admin.put(
    `/${COLLECTION_NAME}/updateStatus?id=${id}&model=${model}`,
    entity
  );
}
export function updateRole(id, entity) {
  return admin.put(`/${COLLECTION_NAME}/updateRoleAdmin?id=${id}`, entity);
}
export function updatePostAdmin(id, entity) {
  return admin.put(`/${COLLECTION_NAME}/updatePost?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function getRole() {
  return admin.get(`/${COLLECTION_NAME}/getRole`);
}
export function updateCustomerAdmin(id, entity) {
  return admin.put(`/${COLLECTION_NAME}/updateCustomer?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function updateAdmin(id, entity) {
  return admin.put(`/${COLLECTION_NAME}/updateAdmin?id=${id}`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function createPostAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/createPost`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function createCustomerAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/createCustomer`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
export function createAdmin(entity) {
  return admin.post(`/${COLLECTION_NAME}/createAdmin`, entity, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
// headers: {
//     "Content-Type": "multipart/form-data",
//     token: `Bearer ${token}`,
// },
