import * as types from "./actionTypes";
import axios from "axios";

const getAllUserDataRequest = () => {
  return {
    type: types.GET_ALL_USER_DATA_REQUEST,
  };
};

const getAllUserDataSuccess = (payload) => {
  return {
    type: types.GET_ALL_USER_DATA_SUCCESS,
    payload,
  };
};

const getAllUserDataFailure = () => {
  return {
    type: types.GET_ALL_USER_DATA_FAILURE,
  };
};

const postAllUserDataRequest = () => {
  return {
    type: types.POST_ALL_USER_DATA_REQUEST,
  };
};

const postAllUserDataSuccess = (payload) => {
  return {
    type: types.POST_ALL_USER_DATA_SUCCESS,
    payload,
  };
};

const postAllUserDataFailure = () => {
  return {
    type: types.POST_ALL_USER_DATA_FAILURE,
  };
};

const patchAllUserDataRequest = () => {
  return {
    type: types.PATCH_ALL_USER_DATA_REQUEST,
  };
};

const patchAllUserDataSuccess = (payload) => {
  return {
    type: types.PATCH_ALL_USER_DATA_SUCCESS,
    payload,
  };
};

const patchAllUserDataFailure = () => {
  return {
    type: types.PATCH_ALL_USER_DATA_FAILURE,
  };
};

const deleteAllUserDataRequest = () => {
  return {
    type: types.DELETE_ALL_USER_DATA_REQUEST,
  };
};

const deleteAllUserDataSuccess = (payload) => {
  return {
    type: types.DELETE_ALL_USER_DATA_SUCCESS,
    payload,
  };
};

const deleteAllUserDataFailure = () => {
  return {
    type: types.DELETE_ALL_USER_DATA_FAILURE,
  };
};

const getSingleUserDataRequest = () => {
  return {
    type: types.GET_SINGLE_USER_DATA_REQUEST,
  };
};

const getSingleUserDataSuccess = (payload) => {
  return {
    type: types.GET_SINGLE_USER_DATA_SUCCESS,
    payload,
  };
};

const getSingleUserDataFailure = () => {
  return {
    type: types.GET_ALL_USER_DATA_FAILURE,
  };
};

const postAllUserData = (payload) => (dispatch) => {
  postAllUserDataRequest();

  return axios
    .post(`https://proseswebtechnology.onrender.com/user/add`, payload)
    .then((res) => {
      console.log("Post Req", res.data);
      return dispatch(postAllUserDataSuccess([res.data]));
    })
    .catch((err) => {
      console.log(err);
      dispatch(postAllUserDataFailure());
    });
};

const getAllUserData = () => (dispatch) => {
  getAllUserDataRequest();

  return axios
    .get(`https://proseswebtechnology.onrender.com/user`)
    .then((res) => {
      console.log("Get Req", res.data);
      return dispatch(getAllUserDataSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getAllUserDataFailure());
    });
};

const patchAllUserData = (id, payload) => (dispatch) => {
  console.log(payload);

  patchAllUserDataRequest();

  return axios
    .put(`https://proseswebtechnology.onrender.com/user/edit/${id}`, payload)
    .then((res) => {
      console.log("patch Req", res.data);
      return dispatch(patchAllUserDataSuccess([res.data]));
    })
    .catch((err) => {
      console.log(err);
      dispatch(patchAllUserDataFailure());
    });
};

const deleteAllUserData = (id) => (dispatch) => {
  deleteAllUserDataRequest();

  return axios
    .delete(`https://proseswebtechnology.onrender.com/user/delete/${id}`)
    .then((res) => {
      console.log("delete Req", res.data);
      return dispatch(deleteAllUserDataSuccess([res.data]));
    })
    .catch((err) => {
      console.log(err);
      dispatch(deleteAllUserDataFailure());
    });
};

const getSingleUserData = (id) => (dispatch) => {
  getSingleUserDataRequest();

  return axios
    .get(`https://proseswebtechnology.onrender.com/user/${id}`)
    .then((res) => {
      console.log("Single user Get Req", res.data);
      return dispatch(getSingleUserDataSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getSingleUserDataFailure());
    });
};

export {
  postAllUserData,
  getAllUserData,
  patchAllUserData,
  deleteAllUserData,
  getSingleUserData,
};
