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
