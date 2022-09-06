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
