import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  socketAdmin: null,
  showNavbar: false,
  showSetting: false,
  showSidebar: false,
  showNotification: false,
  showSearch: false,
  isRequest: false,
  isUploadImage: false,
  errorGlobal: "",
  notifyGlobal: "",
  breadcrumb: "",
  slug: '',
  showDetailPost: false,
  showDetailCustomer: false,
  showDetailCategory: false,
  showDetailAdmin: false,
  showDetailComment: false,
  showUpdatePost: false,
  showEditPostCustomer: false,
  showFeedback: false,
  showUpdateCategory: false,
  showUpdateCustomer: false,
  showUpdateAdmin: false,
  showUpdateComment: false,
  showAddPost: false,
  showAddCategory: false,
  showAddCustomer: false,
  showAddAdmin: false,
  showAddComment: false,
  showSignin: false,
  showSignup: false,
  showSearchAdmin: false,
  showChangePassword: false,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleNavbar: (state) => {
      return {
        ...state,
        showNavbar: !state.showNavbar,
      };
    },
    toggleSignin: (state) => {
      return {
        ...state,
        showSignin: !state.showSignin,
      };
    },
    toggleSignup: (state) => {
      return {
        ...state,
        showSignup: !state.showSignup,
      };
    },
    toggleNotification: (state) => {
      return {
        ...state,
        showNotification: !state.showNotification,
      };
    },
    toggleSetting: (state) => {
      return {
        ...state,
        showSetting: !state.showSetting,
      };
    },
    toggleSearch: (state) => {
      return {
        ...state,
        showSearch: !state.showSearch,
      };
    },
    toggleSideBar: (state) => {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    },
    toggleDetaiPost: (state) => {
      return {
        ...state,
        showDetailPost: !state.showDetailPost,
      };
    },
    toggleDetailCategory: (state) => {
      return {
        ...state,
        showDetailCategory: !state.showDetailCategory,
      };
    },
    toggleDetailCustomer: (state) => {
      return {
        ...state,
        showDetailCustomer: !state.showDetailCustomer,
      };
    },
    toggleDetailAdmin: (state) => {
      return {
        ...state,
        showDetailAdmin: !state.showDetailAdmin,
      };
    },
    toggleUpdateAdmin: (state) => {
      return {
        ...state,
        showUpdateAdmin: !state.showUpdateAdmin,
      };
    },
    toggleUpdateCustomer: (state) => {
      return {
        ...state,
        showUpdateCustomer: !state.showUpdateCustomer,
      };
    },
    toggleUpdateCategory: (state) => {
      return {
        ...state,
        showUpdateCategory: !state.showUpdateCategory,
      };
    },
    toggleUpdatePost: (state) => {
      return {
        ...state,
        showUpdatePost: !state.showUpdatePost,
      };
    },
    toggleEditPostCustomer: (state) => {
      return {
        ...state,
        showEditPostCustomer: !state.showEditPostCustomer,
      };
    },
    toggleFeedback: (state) => {
      return {
        ...state,
        showFeedback: !state.showFeedback,
      };
    },
    toggleAddAdmin: (state) => {
      return {
        ...state,
        showAddAdmin: !state.showAddAdmin,
      };
    },
    toggleAddCustomer: (state) => {
      return {
        ...state,
        showAddCustomer: !state.showAddCustomer,
      };
    },
    toggleAddCategory: (state) => {
      return {
        ...state,
        showAddCategory: !state.showAddCategory,
      };
    },
    toggleAddPost: (state) => {
      return {
        ...state,
        showAddPost: !state.showAddPost,
      };
    },
    toggleChangePassword: (state) => {
      return {
        ...state,
        showChangePassword: !state.showChangePassword,
      };
    },
    toggleShowComment: (state) => {
      return {
        ...state,
        showDetailComment: !state.showDetailComment,
      };
    },
    closeShowComment: (state) => {
      return {
        ...state,
        showDetailComment: false,
      };
    },
    closeNavbar: (state) => {
      return {
        ...state,
        showNavbar: false,
      };
    },
    closeSidebar: (state) => {
      return {
        ...state,
        showSidebar: false,
      };
    },
    closeDetailPost: (state) => {
      return {
        ...state,
        showDetailPost: false,
      };
    },
    closeDetailCategory: (state) => {
      return {
        ...state,
        showDetailCategory: false,
      };
    },
    closeDetailCustomer: (state) => {
      return {
        ...state,
        showDetailCustomer: false,
      };
    },
    closeDetailAdmin: (state) => {
      return {
        ...state,
        showDetailAdmin: false,
      };
    },
    closeUpdatePost: (state) => {
      return {
        ...state,
        showUpdatePost: false,
      };
    },
    closeEditPostCustomer: (state) => {
      return {
        ...state,
        showEditPostCustomer: false,
      };
    },
    closeUpdateAdmin: (state) => {
      return {
        ...state,
        showUpdateAdmin: false,
      };
    },
    closeUpdateCustomer: (state) => {
      return {
        ...state,
        showUpdateCustomer: false,
      };
    },
    closeUpdateCategory: (state) => {
      return {
        ...state,
        showUpdateCategory: false,
      };
    },
    closeFeedback: (state) => {
      return {
        ...state,
        showFeedback: false,
      };
    },
    closeAddPost: (state) => {
      return {
        ...state,
        showAddPost: false,
      };
    },
    closeAddAdmin: (state) => {
      return {
        ...state,
        showAddAdmin: false,
      };
    },
    closeAddCustomer: (state) => {
      return {
        ...state,
        showAddCustomer: false,
      };
    },
    closeAddCategory: (state) => {
      return {
        ...state,
        showAddCategory: false,
      };
    },
    closeSetting: (state) => {
      return {
        ...state,
        showSetting: false,
      };
    },
    closeSearch: (state) => {
      return {
        ...state,
        showSearch: false,
      };
    },
    closeNotification: (state) => {
      return {
        ...state,
        showNotification: false,
      };
    },
    setErrorGlobal: (state, action) => {
      return {
        ...state,
        errorGlobal: action.payload,
      };
    },
    setNotifyGlobal: (state, action) => {
      return {
        ...state,
        notifyGlobal: action.payload,
      };
    },
    setRequest: (state, action) => {
      return {
        ...state,
        isRequest: action.payload,
      };
    },
    setSocket: (state, action) => {
      return {
        ...state,
        socket: action.payload,
      };
    },
    setSocketAdmin: (state, action) => {
      return {
        ...state,
        socketAdmin: action.payload,
      };
    },
    toggleSearchAdmin: (state) => {
      return {
        ...state,
        showSearchAdmin: !state.showSearchAdmin,
      };
    },
    closeSearchAdmin: (state) => {
      return {
        ...state,
        showSearchAdmin: false,
      };
    },
    closeChangePassword: (state) => {
      return {
        ...state,
        showChangePassword: false,
      };
    },
    setUploadImage: (state, action) => {
      return {
        ...state,
        isUploadImage: action.payload,
      };
    },
    setBreadcrumb: (state, action) => {
      return {
        ...state,
        breadcrumb: action.payload,
      };
    },
    setSlug: (state, action) => {
      return {
        ...state,
        slug: action.payload,
      };
    },

  },
});

export const {
  toggleNavbar,
  toggleSearch,
  toggleSetting,
  closeNavbar,
  closeSearch,
  closeSetting,
  setErrorGlobal,
  setNotifyGlobal,
  setRequest,
  closeDetailAdmin,
  closeDetailCategory,
  closeDetailCustomer,
  closeDetailPost,
  closeSidebar,
  toggleDetaiPost,
  toggleDetailAdmin,
  toggleDetailCategory,
  toggleDetailCustomer,
  toggleSideBar,
  closeUpdateAdmin,
  closeUpdateCategory,
  closeUpdateCustomer,
  closeUpdatePost,
  toggleUpdateAdmin,
  toggleUpdateCategory,
  toggleUpdateCustomer,
  toggleUpdatePost,
  closeAddAdmin,
  closeAddCategory,
  closeAddCustomer,
  closeAddPost,
  toggleAddAdmin,
  toggleAddCategory,
  toggleAddCustomer,
  toggleAddPost,
  setSocket,
  closeNotification,
  toggleNotification,
  closeFeedback,
  toggleFeedback,
  toggleSignin,
  toggleSignup,
  setSocketAdmin,
  closeSearchAdmin,
  toggleSearchAdmin,
  setUploadImage,
  setBreadcrumb,
  closeChangePassword,
  toggleChangePassword,
  closeShowComment,
  toggleShowComment,
  closeEditPostCustomer,
  toggleEditPostCustomer,
  setSlug
} = globalSlice.actions;
export default globalSlice.reducer;
