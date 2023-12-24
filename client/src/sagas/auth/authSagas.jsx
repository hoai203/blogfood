import { takeLatest } from "redux-saga/effects";
import { loginRequest, logout, registerRequest } from "./authSlice";
import { authenticateCustomer, logoutCustomer, registerCustomer } from "./handles";

export default function* authSagas() {
    yield takeLatest(loginRequest.type, authenticateCustomer)
    yield takeLatest(registerRequest.type, registerCustomer)
    yield takeLatest(logout.type, logoutCustomer)
}