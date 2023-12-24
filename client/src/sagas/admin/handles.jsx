import { call, put } from "redux-saga/effects";
import {
  createAdmin,
  createPostAdmin,
  getAllPostAdmin,
  getListAdmin,
  getRole,
  getSearchAdmin,
  getStatistical,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
  updateAdmin,
  updateCustomerAdmin,
  updatePostAdmin,
  updateRole,
  updateStatus,
} from "./request";
import { setErrorGlobal, setNotifyGlobal } from "../global/globalSlice";
import {
  addAdminSuccess,
  addCustomerAdminSuccess,
  addPostAdminSuccess,
  getAllAdminRequest,
  getAllAdminSuccess,
  getCategoriesAdminRequest,
  getCustomersAdminRequest,
  getCustomersAdminSuccess,
  getPostsAdminRequest,
  getPostsAdminSuccess,
  loginAdminSuccess,
  registerAdminSuccess,
  requestAdminFailure,
  roleAdminSuccess,
  searchAdminSuccess,
  searchCategoriesSuccess,
  searchCustomersSuccess,
  searchPostsSuccess,
  setInfoAdmin,
  statisticalCategoriesSuccess,
  statisticalCustomersSuccess,
  statisticalFeedbacksSuccess,
  statisticalPostsSuccess,
  updateAdminSuccess,
  updateCustomerAdminSuccess,
  updatePostAdminSuccess,
  updateRoleAdminSuccess,
  updateStatusSuccess,
} from "./adminSlice";
import { FeedbackRequest } from "../feedbackMail/feedbacksSlice";
import {
  createCustomerAdmin,
  getAllCustomersByAdmin,
} from "../customers/request";
import { addNotificationRequest } from "../notification/notificationSlice";
import { addNotificationAdmin } from "../notification/request";

export function* handleLoginAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(loginAdmin, payload);
    if (response) {
      const { message, accessToken, ...info } = response.data;
      yield put(loginAdminSuccess(accessToken));
      yield put(setNotifyGlobal(message));
      yield put(setInfoAdmin(info));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleRegisterAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(registerAdmin, payload);
    if (response) {
      yield put(registerAdminSuccess());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleLogoutAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(logoutAdmin, payload?.id);
    if (response) {
      yield put(setErrorGlobal(""));
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}

export function* handleGetAllPostsAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllPostAdmin, payload);
    if (response?.data) {
      yield put(getPostsAdminSuccess(response.data?.reverse()));
    } else {
      yield put(getPostsAdminSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSearchAdmin({ payload }) {
  const { key, model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getSearchAdmin, model, key);
    if (response?.data) {
      const data = response.data?.reverse()
      yield put(searchAdminSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSearchCustomer({ payload }) {
  const { key, model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getSearchAdmin, model, key);
    if (response?.data) {
      const data = response.data?.reverse()
      yield put(searchCustomersSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleStatisticalCustomer({ payload }) {
  const { model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getStatistical, model);
    if (response?.data) {
      const data = response.data
      yield put(statisticalCustomersSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleStatisticalPosts({ payload }) {
  const { model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getStatistical, model);
    if (response?.data) {
      const data = response.data
      yield put(statisticalPostsSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleStatisticalFeedbacks({ payload }) {
  const { model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getStatistical, model);
    if (response?.data) {
      const data = response.data
      yield put(statisticalFeedbacksSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleStatisticalCategory({ payload }) {
  const { model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getStatistical, model);
    if (response?.data) {
      const data = response.data
      yield put(statisticalCategoriesSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSearchCategories({ payload }) {
  const { key, model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getSearchAdmin, model, key);
    if (response?.data) {
      const data = response.data?.reverse()
      yield put(searchCategoriesSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleSearchPosts({ payload }) {
  const { key, model } = payload
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getSearchAdmin, model, key);
    if (response?.data) {
      const data = response.data?.reverse()
      yield put(searchPostsSuccess(data));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleGetRole({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getRole, payload);
    if (response?.data) {
      yield put(roleAdminSuccess(response.data?.reverse()));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleGetAllAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getListAdmin, payload);
    if (response?.data) {
      yield put(getAllAdminSuccess(response.data?.reverse()));
    } else {
      yield put(getAllAdminSuccess([]));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleGetAllCustomersByAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(getAllCustomersByAdmin, payload);
    if (response) {
      yield put(getCustomersAdminSuccess(response.data?.reverse()));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdateStatus({ payload }) {
  const { id, model, status, handleSendNotification } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateStatus, id, model, { status });
    if (response?.data) {
      const data = response.data
      yield put(updateStatusSuccess());
      switch (model) {
        case "post":
          yield call(addNotificationAdmin, {
            id_post: data?._id,
            id_customer: data?.id_customer,
            typeNotify: status
          })
          yield call(handleSendNotification, data?.id_customer);
          yield put(getPostsAdminRequest());
          break;
        case "category":
          yield put(getCategoriesAdminRequest());
          break;
        case "customer":
          yield put(getCustomersAdminRequest());
          break;
        case "comment":
          yield put(getCategoriesAdminRequest());
          break;
        case "admin":
          yield put(getAllAdminRequest());
          break;
        case "feedback":
          yield put(FeedbackRequest());
          break;
        default:
          put(setErrorGlobal("Có lỗi xảy ra khi thay đổi trạng thái!"));
          break;
      }
      yield put(setNotifyGlobal("Cập nhật trạng thái thành công"));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdatePostAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updatePostAdmin, payload?.id, payload?.post);
    if (response?.data) {
      yield put(updatePostAdminSuccess());
      // yield put(postDetailRequest({ slug: payload?.slug }));
      yield put(getPostsAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdateRoleAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateRole, payload?.id, payload?.role);
    if (response?.data) {
      yield put(updateRoleAdminSuccess());
      yield put(getAllAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdateCustomerAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(
      updateCustomerAdmin,
      payload?.id,
      payload?.customer
    );
    if (response?.data) {
      yield put(updateCustomerAdminSuccess());
      // yield put(postDetailRequest({ slug: payload?.slug }));
      yield put(getCustomersAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleUpdateAdmin({ payload }) {
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(updateAdmin, payload?.id, payload?.admin);
    if (response?.data) {
      yield put(updateAdminSuccess());
      // yield put(postDetailRequest({ slug: payload?.slug }));
      yield put(getAllAdminRequest());
      yield put(setNotifyGlobal(response.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreatePostsAdmin({ payload }) {
  const { post, reset } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createPostAdmin, post);
    if (response?.data) {
      yield put(addPostAdminSuccess());
      yield put(getPostsAdminRequest());
      yield reset();
    }
    yield put(setNotifyGlobal(response?.data?.message));
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreateCustomerAdmin({ payload }) {
  const { customer, reset } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createCustomerAdmin, customer);
    if (response?.data) {
      yield put(addCustomerAdminSuccess());
      yield put(getCustomersAdminRequest());
      yield reset();
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCreateAdmin({ payload }) {
  const { admin, reset } = payload;
  try {
    yield put(setNotifyGlobal(""));
    yield put(setErrorGlobal(""));
    const response = yield call(createAdmin, admin);
    if (response?.data) {
      yield put(addAdminSuccess());
      yield put(getAllAdminRequest());
      yield reset();
      yield put(setNotifyGlobal(response?.data?.message));
    }
  } catch (error) {
    yield handleCommonError(error);
  }
}
export function* handleCommonError(error) {
  console.log("error admin:", error);
  if (error?.code === "ERR_NETWORK") {
    yield put(requestAdminFailure(error));
    yield put(setErrorGlobal(error?.message));
  } else {
    yield put(setNotifyGlobal(""));
    yield put(requestAdminFailure(error?.response?.data));
    yield put(setErrorGlobal(error?.response?.data?.message));
  }
}
