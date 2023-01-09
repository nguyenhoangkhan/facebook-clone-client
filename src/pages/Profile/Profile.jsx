import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import * as actions from "../../redux/actions";
import Header from "../../components/Header";
import Cover from "./Components/Cover";
import ProfilePictureInfos from "./Components/ProfilePictureInfos";
import ProfileMenu from "./Components/ProfileMenu";
import CreatePost from "../../components/CreatePost";
import GridPosts from "./Components/GridPosts";
import Post from "../../components/Post";
import Photos from "./Components/Photos";
import FriendsList from "./Components/FriendsList";
import { Introduction } from "./Components/Introduction";
import CreatePostPopup from "../../components/CreatePostPopup/CreatePostPopup";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { user, profile } = useSelector((state) => ({ ...state }));

  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false);

  let isVisitor = username === user.username ? false : true;

  const [photos, setPhotos] = useState([]);
  const getProfile = async () => {
    try {
      dispatch(actions.PROFILE_REQUEST());

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/${username}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      dispatch(actions.PROFILE_SUCCESS(data));
    } catch (err) {
      dispatch(actions.PROFILE_ERROR(err));
    }
  };

  const getUploadedImages = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
        params: {
          path: `${username}/*`,
          order: "desc",
          max: 30,
        },
      }
    );
    if (res.status === 200) {
      setPhotos(res?.data);
    }
  };

  useEffect(() => {
    getProfile();
    getUploadedImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, user.token]);
  return (
    <div>
      <Header />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.profile?.cover} photos={photos.resources} />
          <ProfilePictureInfos
            isVisitor={isVisitor}
            profile={profile?.profile}
            photos={photos.resources}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <div className="profile_grid">
              <div className="profile_left">
                <Introduction
                  detailsInfo={profile?.profile?.details}
                  isVisitor={isVisitor}
                  getProfile={getProfile}
                />
                <Photos photos={photos} />
                <FriendsList friends={profile?.profile?.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                <CreatePost
                  user={user}
                  setShowCreatePostPopup={setShowCreatePostPopup}
                />
                {showCreatePostPopup && (
                  <CreatePostPopup
                    setShowCreatePostPopup={setShowCreatePostPopup}
                    user={user}
                    profile
                  />
                )}
                <GridPosts friends={profile?.profile?.friends} />
                <div className="posts">
                  {profile?.profile?.post &&
                    profile?.profile?.post.length &&
                    profile?.profile?.post.map((post, idx) => (
                      <Post
                        profile={profile?.profile}
                        key={idx}
                        post={post}
                        user={user}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
