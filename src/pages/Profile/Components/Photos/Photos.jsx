const Photos = ({ photos }) => {
  console.log("photos?.resources ", photos?.resources);

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
        {photos?.resources?.length
          ? photos.resources.slice(0, 9).map(
              (img) =>
                !img?.secure_url.includes("comments_images") && (
                  <div className="profile_photo_card" key={img?.public_id}>
                    <img src={img?.secure_url} alt="" />
                  </div>
                )
            )
          : ""}
      </div>
    </div>
  );
};

export default Photos;
