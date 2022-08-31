import { useSelector } from "react-redux";

import * as selectors from "../../redux/selectors";
import Header from "../../components/Header";
import { LeftHome, RightHome, Stories } from "../../components/Home";
import CreatePost from "../../components/CreatePost";

const Home = () => {
  const { user } = useSelector(selectors.user);

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
