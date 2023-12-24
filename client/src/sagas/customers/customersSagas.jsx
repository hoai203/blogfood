import { takeLatest } from "redux-saga/effects";
import { handleChangePassword, handleGetAllCustomers, handleGetDetailCustomer, handleGetInfoAdmin, handleSearchCategories, handleSearchCustomers, handleSearchPosts, handleUpdateCustomers } from "./handles";
import { adminInfoRequest, changePasswordRequest, customerDetailRequest, customersRequest, searchCategoriesRequest, searchCustomersRequest, searchPostsRequest, updateCustomerRequest } from "./customersSlice";

export default function* customersSagas() {
    yield takeLatest(customerDetailRequest.type, handleGetDetailCustomer)
    yield takeLatest(adminInfoRequest.type, handleGetInfoAdmin)
    yield takeLatest(customersRequest.type, handleGetAllCustomers)
    yield takeLatest(updateCustomerRequest.type, handleUpdateCustomers)
    yield takeLatest(changePasswordRequest.type, handleChangePassword)
    yield takeLatest(searchCategoriesRequest.type, handleSearchCategories)
    yield takeLatest(searchCustomersRequest.type, handleSearchCustomers)
    yield takeLatest(searchPostsRequest.type, handleSearchPosts)

}