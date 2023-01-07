import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

const searchUser = async (search, token) => {
  let result, error;

  try {
    const res = await axios.get(SERVER_URL + "/search/user", {
      params: {
        q: search.trim(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      result = res?.data;
    }
  } catch (err) {
    error = err;
  }
  return [result, error];
};
export const addSearchUserHistory = async (searchUser, token) => {
  let result, error;

  try {
    const res = await axios.patch(
      SERVER_URL + "/search/user",
      { searchUser },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      result = res?.data?.search;
    }
  } catch (err) {
    error = err;
  }
  return [result, error];
};

export const getSearchUserHistory = async (token) => {
  let result, error;

  try {
    const res = await axios.get(SERVER_URL + "/search/user-history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      result = res?.data;
    }
  } catch (err) {
    error = err;
  }
  return [result, error];
};
export const deleteSearchUserHistory = async (historyId, token) => {
  let result, error;

  try {
    const res = await axios.delete(
      SERVER_URL + "/search/user-history/" + historyId,
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
    error = err;
  }
  return [result, error];
};

export { searchUser };
