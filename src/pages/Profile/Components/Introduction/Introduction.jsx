import { useEffect, useState } from "react";
import { Bio } from "../Bio";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { memo } from "react";
import { EditDetails } from "../EditDetails";

const Introduction = ({ detailsInfo, isVisitor, getProfile }) => {
  const serverURL = process.env.REACT_APP_BACKEND_URL;

  const { user } = useSelector((state) => ({ ...state }));

  const [details, setDetails] = useState();

  const initDetails = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    workPlace: details?.workPlace ? details.workPlace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    homeTown: details?.homeTown ? details.homeTown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };

  const [infos, setInfos] = useState(initDetails);

  useEffect(() => {
    if (detailsInfo) {
      setDetails(detailsInfo);
      setInfos(detailsInfo);
    }
  }, [detailsInfo]);

  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [max, setMax] = useState(infos.bio ? 100 - infos.bio.length : 100);

  const dispatch = useDispatch();

  const handleChangeInputsValue = (e) => {
    const { name, value } = e.target;

    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  const handleUpdateUserDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        serverURL + "/details",
        {
          details: infos,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (res.status === 200) {
        setError("");
        setShowEditBio(false);
        dispatch(actions.UPDATE_DETAILS_PROFILE(res?.data?.details));
        await getProfile();
        setIsLoading(false);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div className="profile_card">
      <div className="profile_card_header">Giới thiệu</div>
      {details?.bio ? (
        <div className="info_col">
          <span className="info_text">{details.bio}</span>
        </div>
      ) : (
        ""
      )}
      {showEditBio && (
        <Bio
          handleUpdateUserDetails={handleUpdateUserDetails}
          infos={infos}
          handleChangeInputsValue={handleChangeInputsValue}
          setShowEditBio={setShowEditBio}
          max={max}
          isLoading={isLoading}
          name="bio"
        />
      )}
      {!isVisitor && !showEditBio ? (
        <div className="info_col">
          <button
            className="gray_btn hover1"
            onClick={() => setShowEditBio(true)}
          >
            Chỉnh sửa Bio
          </button>
        </div>
      ) : (
        ""
      )}
      {details?.workPlace && (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          Làm việc tại {details.workPlace}
        </div>
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img
            width={20}
            height={20}
            src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/eu1ZIPJje34.png"
            alt=""
          />
          {details.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đang học tại {details.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          Đang học tại {details.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Sống tại {details.currentCity}
        </div>
      )}
      {details?.homeTown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Đến từ {details.homeTown}
        </div>
      )}
      {details?.homeTown && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {details.instagram}
          </a>
        </div>
      )}
      {showEditDetails && !isVisitor && (
        <EditDetails
          infos={infos}
          details={details}
          setShowEditDetails={setShowEditDetails}
          handleChangeInputsValue={handleChangeInputsValue}
        />
      )}
      {!isVisitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowEditDetails(true)}
        >
          Chỉnh sửa chi tiết
        </button>
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

export default memo(Introduction);
