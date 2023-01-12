import ClipLoader from "react-spinners/ClipLoader";

const MenuItem = ({ icon, title, subtitle, img, onClick, loading = false }) => {
  return (
    <li className="hover1" onClick={onClick}>
      {loading ? (
        <ClipLoader size={20} color="white" />
      ) : img ? (
        <img src={img} alt="" />
      ) : (
        <i className={icon}></i>
      )}
      <div className="post_menu_text">
        <span>{title}</span>
        {subtitle && <span className="menu_post_col">{subtitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
