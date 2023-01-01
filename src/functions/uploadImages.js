import axios from "axios";
const uploadImages = async (formData, token) => {
  try {
    const serverURL = process.env.REACT_APP_BACKEND_URL;

    const { data } = await axios.post(serverURL + "/uploadImages", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data/",
      },
    });
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
export default uploadImages;
