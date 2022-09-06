import axios from "axios";

const submitPost = async (type, background, text, images, user, token) => {
  try {
    const serverUrl = process.env.REACT_APP_BACKEND_URL;
    await axios.post(
      serverUrl + "/post/createPost",
      {
        type,
        background,
        text,
        images,
        user,
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

export default submitPost;
