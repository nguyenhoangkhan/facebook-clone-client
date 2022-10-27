import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

const Photos = ({ username }) => {
  const [photos, setPhotos] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { isLoading, error, data } = useQuery(["uploadImages"], () =>
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/uploadImages`, {
        headers: { Authorization: `Bearer ${user.token}` },
        params: {
          path: `${username}/posts_images`,
          order: "desc",
          max: 30,
        },
      })
      .then((res) => res.data)
      .then((data) => setPhotos(data))
  );

  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Hình ảnh
        <div className="profile_header_link">Xem tất cả</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos?.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img?.public_id}>
              <img src={img?.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Photos;
