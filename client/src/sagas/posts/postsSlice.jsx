import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsCustomer: [],
  postsCategory: [],
  search_posts: [],
  detail_post: {},
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsRequest: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    getPostsSuccess: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        error: null,
        loading: false,
      };
    },
    getPostsByCategoryRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getPostsByCategorySuccess: (state, action) => {
      return {
        ...state,
        postsCategory: action.payload,
        error: null,
        loading: false,
      };
    },
    getPostsByCustomerRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    },
    getPostsByCustomerSuccess: (state, action) => {
      return {
        ...state,
        postsCustomer: action.payload,
        error: null,
        loading: false,
      };
    },
    createPostsRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    createPostsSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    searchPostsRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getSearchPostsSuccess: (state, action) => {
      return {
        ...state,
        search_posts: action.payload,
        error: null,
        loading: false,
      };
    },
    postDetailRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDetailPostSuccess: (state, action) => {
      return {
        ...state,
        detail_post: action.payload,
        error: null,
        loading: false,
      };
    },
    likePostRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    likePostSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    updatePostRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    updatePostSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    deletePostsRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    deletePostsSuccess: (state) => {
      return {
        ...state,
        error: null,
        loading: false,
      };
    },
    requestFailure: (state, action) => {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
});

export const {
  createPostsRequest,
  createPostsSuccess,
  getDetailPostSuccess,
  getPostsSuccess,
  getSearchPostsSuccess,
  likePostRequest,
  likePostSuccess,
  postDetailRequest,
  postsRequest,
  requestFailure,
  searchPostsRequest,
  updatePostRequest,
  updatePostSuccess,
  getPostsByCategoryRequest,
  getPostsByCategorySuccess,
  getPostsByCustomerRequest,
  getPostsByCustomerSuccess,
  deletePostsRequest,
  deletePostsSuccess
} = postsSlice.actions;
export default postsSlice.reducer;
