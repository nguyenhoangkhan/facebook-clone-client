import { Dots, NewRoom, Search } from "../../../assets/svg";
import Contact from "./Components/Contact";

const RightHome = ({ user }) => {
  const color = "#65676b";
  return (
    <div className="right_home">
      <div className="heading ">Được tài trợ</div>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left heading">Liên hệ</div>
          <div className="contacts_header_right">
            <div className="contact_circle hover2">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle hover2">
              <Search color={color} />
            </div>
            <div className="contact_circle hover2">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contacts_list">
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
};
export default RightHome;
