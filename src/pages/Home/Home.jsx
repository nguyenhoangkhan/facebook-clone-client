import { useSelector } from "react-redux";

import * as selectors from "../../redux/selectors";
import Header from "../../components/Header";
import LeftHome from "../../components/Home/LeftHome";

const Home = () => {
  const { user } = useSelector(selectors.user);

  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
};

export default Home;
