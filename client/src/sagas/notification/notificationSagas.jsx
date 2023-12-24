import { takeEvery, takeLatest } from "redux-saga/effects";
import { addNotificationAdminRequest, addNotificationRequest, deleteAllNotificationAdminRequest, deleteAllNotificationRequest, deleteNotificationRequest, deleteNotificationSuccess, getAllNotificationRequest, getNotificationByAdminRequest, getNotificationByAuthAdminRequest, getNotificationByCustomerRequest, updateAllNotificationRequest, updateNotificationAdminRequest, updateNotificationAuthAdminRequest, updateNotificationRequest } from "./notificationSlice";
import { handleAddNotification, handleAddNotificationAdmin, handleDeleteAllNotificationByCustomer, handleDeleteNotificationByAuthAdmin, handleDeleteNotificationByCustomer, handleGetNotificationByAdmin, handleGetNotificationByAuthAdmin, handleGetNotificationByCustomer, handleUpdateAllNotificationByCustomer, handleUpdateNotificationByAdmin, handleUpdateNotificationByAuthAdmin, handleUpdateNotificationByCustomer } from "./handles";
import { getAllNotification } from "./request";


export default function* notificationSagas() {
    yield takeEvery(addNotificationRequest.type, handleAddNotification)
    yield takeEvery(addNotificationAdminRequest.type, handleAddNotificationAdmin)
    yield takeLatest(getNotificationByCustomerRequest.type, handleGetNotificationByCustomer)
    yield takeLatest(getNotificationByAdminRequest.type, handleGetNotificationByAdmin)
    yield takeLatest(getNotificationByAuthAdminRequest.type, handleGetNotificationByAuthAdmin)
    yield takeLatest(getAllNotificationRequest.type, getAllNotification)
    yield takeLatest(updateNotificationRequest.type, handleUpdateNotificationByCustomer)
    yield takeLatest(updateNotificationAdminRequest.type, handleUpdateNotificationByAdmin)
    yield takeLatest(updateNotificationAuthAdminRequest.type, handleUpdateNotificationByAuthAdmin)
    yield takeLatest(updateAllNotificationRequest.type, handleUpdateAllNotificationByCustomer)
    yield takeLatest(deleteAllNotificationRequest.type, handleDeleteAllNotificationByCustomer)
    yield takeLatest(deleteAllNotificationAdminRequest.type, handleDeleteNotificationByAuthAdmin)
    yield takeLatest(deleteNotificationRequest.type, handleDeleteNotificationByCustomer)
}