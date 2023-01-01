import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { user, profile } = useSelector((state) => ({ ...state }));
  const userName = username === undefined ? user.username : username;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
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
    getProfile();
  }, [userName, username, user.token, dispatch]);

  const { isLoading, error, data } = useQuery(["uploadImages"], () =>
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/uploadImages`, {
        headers: { Authorization: `Bearer ${user.token}` },
        params: {
          path: `${username}/*`,
          order: "desc",
          max: 30,
        },
      })
      .then((res) => res.data)
      .then((data) => setPhotos(data))
  );
  return (
    <div>
      <Header />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.profile?.cover} />
          <ProfilePictureInfos
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
                <Photos photos={photos} />
                <FriendsList />
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
                <CreatePost user={user} profile />
                <GridPosts friends={profile?.profile?.friends} />
                <div className="posts">
                  {profile?.profile?.post &&
                    profile?.profile?.post.length &&
                    profile?.profile?.post.map((post, idx) => (
                      <Post key={idx} post={post} user={user} />
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
