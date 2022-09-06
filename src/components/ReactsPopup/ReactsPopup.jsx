import reacts from "../../assets/data/reacts";

const ReactsPopup = ({ setShowReactsPopup }) => {
  return (
    <div
      className="reacts_popup"
      onMouseOver={() =>
        setTimeout(() => {
          setShowReactsPopup(true);
        }, 500)
      }
      onMouseLeave={() =>
        setTimeout(() => {
          setShowReactsPopup(false);
        }, 500)
      }
    >
      {reacts.map((react, idx) => (
        <div key={idx} className="react">
          <img src={react.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ReactsPopup;
