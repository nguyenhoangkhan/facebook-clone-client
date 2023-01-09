import { useSelector } from "react-redux";

import * as selectors from "../../redux/selectors";
import Header from "../../components/Header";
import { LeftHome, RightHome, Stories } from "../../components/Home";
import CreatePost from "../../components/CreatePost";
import CreatePostPopup from "../../components/CreatePostPopup";
import { useState } from "react";
import Post from "../../components/Post";

const Home = () => {
  const user = useSelector(selectors.user);
  const posts = useSelector(selectors.posts);

  const [isShowCreatePostPopup, setShowCreatePostPopup] = useState(false);
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost
          user={user}
          setShowCreatePostPopup={setShowCreatePostPopup}
        />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} user={user} post={post} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
      {isShowCreatePostPopup && (
        <CreatePostPopup
          setShowCreatePostPopup={setShowCreatePostPopup}
          user={user}
        />
      )}
    </div>
  );
};

export default Home;
