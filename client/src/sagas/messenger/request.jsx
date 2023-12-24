import axios from "../../axios-interceptor/api";
const COLLECTION_CONVERSATION = "conversations";
const COLLECTION_MESSAGE = "messages";
export function getConversation(userId) {
  return axios.get(`/${COLLECTION_CONVERSATION}/${userId}`);
}
export function createConversation(entity) {
  return axios.post(`/${COLLECTION_CONVERSATION}/`, entity);
}
export function createMessage(entity) {
  console.log("🚀 --> createMessage --> entity:", entity);
  return axios.post(`/${COLLECTION_MESSAGE}/`, entity);
}
export function getMessage(id) {
  return axios.get(`/${COLLECTION_MESSAGE}/${id}`);
}
