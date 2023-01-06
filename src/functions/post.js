import axios from "axios";

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

export const submitPost = async (
  type,
  background,
  text,
  images,
  userId,
  token
) => {
  try {
    await axios.post(
      SERVER_URL + "/post/createPost",
      {
        type,
        background,
        text,
        images,
        user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "Successfully";
  } catch (err) {
    return err.response.data.message;
  }
};

export const reactPost = async (postId, react, token) => {
  let result, error;

  try {
    const res = await axios.patch(
      `${SERVER_URL}/react`,
      {
        postId,
        react,
      },
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

export const getReacts = async (postId, token) => {
  let result, error;

  try {
    const res = await axios.get(`${SERVER_URL}/react/${postId}`, {
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

export const createComment = async (comment, image, postId, token) => {
  let result, err;
  try {
    const res = await axios.patch(
      `${SERVER_URL}/post/comment`,
      {
        comment,
        image,
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      result = res?.data;
    }
  } catch (error) {
    err = error?.response?.data?.message;
  }

  return [result, err];
};
