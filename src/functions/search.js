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

export { searchUser };
