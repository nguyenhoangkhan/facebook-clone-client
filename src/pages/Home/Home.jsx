import { useSelector } from "react-redux";

import * as selectors from "../../redux/selectors";
import Header from "../../components/Header";
import { LeftHome, RightHome } from "../../components/Home";

const Home = () => {
  const { user } = useSelector(selectors.user);

  return (
    <div>
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
    </div>
  );
};

export default Home;
