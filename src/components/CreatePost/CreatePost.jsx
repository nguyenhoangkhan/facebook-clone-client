import { Feeling, LiveVideo, Photo } from "../../assets/svg";

export default function CreatePost({ user }) {
  return (
    <div className="createPost">
      <div className="createPost_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2">
          {user?.first_name} ơi, bạn đang nghĩ gì thế ?
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="createPost_body">
        <div className="createPost_icon hover2">
          <LiveVideo color="#f3425f" />
          Video trực tiếp
        </div>
        <div className="createPost_icon hover2">
          <Photo color="#4bbf67" />
          Ảnh/Video{" "}
        </div>
        <div className="createPost_icon hover2">
          <Feeling color="#f7b928" />
          Cảm xúc/Hoạt động
        </div>
      </div>
    </div>
  );
}
