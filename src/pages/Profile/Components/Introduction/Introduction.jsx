import { useState } from "react";

const Introduction = ({ details }) => {
  const detailInfos = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workPlace: details?.workPlace ? details.workPlace : "Google",
    highSchool: details?.highSchool ? details.highSchool : "some high school",
    college: details?.college ? details.college : "some college",
    currentCity: details?.currentCity ? details.currentCity : "Bình Dương",
    homeTown: details?.homeTown ? details.homeTown : "Cần Thơ",
    relationship: details?.relationship ? details.relationship : "Độc thân",
    instagram: details?.instagram ? details.instagram : "hwang.khan_",
  };

  const [infos, setInfos] = useState(detailInfos);

  console.log("detailInfos ", detailInfos);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Giới thiệu</div>
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
          <img src="../../../icons/relationship.png" alt="" />
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
    </div>
  );
};

export default Introduction;
