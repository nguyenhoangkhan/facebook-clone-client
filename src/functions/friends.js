import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const getFriendsPageInfos = async (token) => {
  let result, error;
  try {
    const res = await axios.get(`${SERVER_URL}/friends/getFriendsPageInfos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      result = res?.data;
    }
  } catch (err) {
    error = err?.response?.data?.message;
  }
  return [result, error];
};
