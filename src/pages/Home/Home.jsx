import { useSelector } from "react-redux";

import * as selectors from "../../redux/selectors";
import Header from "../../components/Header";
import { LeftHome, RightHome, Stories } from "../../components/Home";

const Home = () => {
  const { user } = useSelector(selectors.user);

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
