import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const follow = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/follow/${receiverId}`,
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

export const unFollow = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/unFollow/${receiverId}`,
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

export const addFriend = async (receiverId, token) => {
  let result, error;
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

export const unFriend = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/friends/un-friend/${receiverId}`,
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

export const deleteFriendRequest = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/friends/delete-friend-request/${receiverId}`,
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

export const acceptFriendRequest = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/friends/accept-friend-request/${receiverId}`,
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

export const cancelFriendRequest = async (receiverId, token) => {
  let result, error;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/friends/cancel-friend-request/${receiverId}`,
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
