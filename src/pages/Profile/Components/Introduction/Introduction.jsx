import { useState } from "react";
import { Bio } from "../Bio";

const Introduction = ({ details, isVisitor }) => {
  const detailInfos = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workPlace: details?.workPlace ? details.workPlace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    homeTown: details?.homeTown ? details.homeTown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };

  const [infos, setInfos] = useState(detailInfos);
  const [showBio, setShowBio] = useState(true);
  const [max, setMax] = useState(infos.bio ? 100 - infos.bio.length : 100);

  const handleBioChange = (e) => {
    setInfos({ ...infos, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">Giới thiệu</div>
      {infos.bio && (
        <div className="info_col">
          <span className="info_text">{infos.bio}</span>
          {!isVisitor && !showBio ? (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Chỉnh sửa Bio
            </button>
          ) : (
            ""
          )}
        </div>
      )}
      {showBio && (
        <Bio
          infos={infos}
          handleBioChange={handleBioChange}
          setShowBio={setShowBio}
          max={max}
        />
      )}
      {infos.job && infos.workPlace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Làm việc tại {infos.job} at <b>{infos.workPlace}</b>
        </div>
      ) : infos.job && !infos.workPlace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Làm việc tại {infos.job}
        </div>
      ) : (
        infos.workPlace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            Làm việc tại {infos.workPlace}
          </div>
        )
      )}
      {infos?.relationship && (
        <div className="info_profile">
          <img
            width={20}
            height={20}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/eu1ZIPJje34.png"
            alt=""
          />
          {infos.relationship}
        </div>
      )}
      {infos?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đang học tại {infos.college}
        </div>
      )}
      {infos?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đang học tại {infos.highSchool}
        </div>
      )}
      {infos?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Sống tại {infos.currentCity}
        </div>
      )}
      {infos?.homeTown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Đến từ {infos.homeTown}
        </div>
      )}
      {infos?.homeTown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {infos.instagram}
          </a>
        </div>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Chỉnh sửa chi tiết</button>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Chỉnh sửa sở thích</button>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Thêm nổi bật</button>
      )}
    </div>
  );
};

export default Introduction;
