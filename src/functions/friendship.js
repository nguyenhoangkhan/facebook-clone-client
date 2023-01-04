import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const addFriend = async (receiverId, token) => {
  let result, error;
  console.log("receiverId ", receiverId);
  try {
    const res = await axios.patch(
      `${SERVER_URL}/friends/add-friend/${receiverId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      result = res?.data;
    }
  } catch (err) {
    error = err?.response?.data?.message;
  }
  return [result, error];
};
