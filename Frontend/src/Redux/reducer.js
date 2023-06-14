import * as types from "./actionTypes";

const initState = {
  isLoading: true,
  isError: false,
  userData: [],
  postUser: [],
  patchUser: [],
  deleteUser: [],
  singleUser: [],
};

export const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: payload,
      };

    case types.GET_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.POST_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.POST_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postUser: payload,
      };

    case types.POST_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.PATCH_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.PATCH_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patchUser: payload,
      };

    case types.PATCH_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.DELETE_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.DELETE_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteUser: payload,
      };

    case types.DELETE_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.GET_SINGLE_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_SINGLE_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleUser: payload,
      };

    case types.GET_SINGLE_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
