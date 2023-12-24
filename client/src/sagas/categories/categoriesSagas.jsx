import { takeLatest } from "redux-saga/effects";
import { handleGetAllCategories, handleGetDetailCategories } from "./handles";
import { categoriesRequest, detailCategoriesRequest } from "./categoriesSlice";

export default function* categoriesSagas() {
    yield takeLatest(categoriesRequest.type, handleGetAllCategories)
    yield takeLatest(detailCategoriesRequest.type, handleGetDetailCategories)
}