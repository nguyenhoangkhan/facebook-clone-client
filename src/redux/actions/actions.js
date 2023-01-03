// USER
export const LOGIN = (payload) => {
  return {
    type: "LOGIN",
    payload,
  };
};
export const LOGOUT = () => {
  return {
    type: "LOGOUT",
  };
};
// POSTS
export const POST_REQUEST = () => {
  return {
    type: "POST_REQUEST",
  };
};
export const POST_SUCCESS = (payload) => {
  return {
    type: "POST_SUCCESS",
    payload,
  };
};
export const POST_ERROR = (payload) => {
  return {
    type: "POST_ERROR",
    payload,
  };
};
// POSTS
export const PROFILE_REQUEST = () => {
  return {
    type: "PROFILE_REQUEST",
  };
};
export const PROFILE_SUCCESS = (payload) => {
  return {
    type: "PROFILE_SUCCESS",
    payload,
  };
};
export const PROFILE_ERROR = (payload) => {
  return {
    type: "PROFILE_ERROR",
    payload,
  };
};
// PROFILE
export const UPDATE_PICTURE_PROFILE = (payload) => {
  return {
    type: "UPDATE_PICTURE_PROFILE",
    payload,
  };
};
export const UPDATE_COVER_PROFILE = (payload) => {
  return {
    type: "UPDATE_COVER_PROFILE",
    payload,
  };
};
export const UPDATE_DETAILS_PROFILE = (payload) => {
  return {
    type: "UPDATE_COVER_PROFILE",
    payload,
  };
};
