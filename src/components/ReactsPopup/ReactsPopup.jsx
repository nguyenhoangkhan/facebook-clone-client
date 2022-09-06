const reactsArray = [
  {
    name: "like",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Flike.gif?alt=media&token=2b4c1d73-dc6b-418d-af6b-a0d3b9a4dd61",
  },
  {
    name: "love",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Flove.gif?alt=media&token=fd5757ed-9130-41d5-a8ab-7002ba226e90",
  },
  {
    name: "haha",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Fhaha.gif?alt=media&token=95c5e32c-454e-4e2d-8a24-011586bd9400",
  },
  {
    name: "wow",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Fwow.gif?alt=media&token=8e7fd0c3-4c9c-4b3d-afb3-16b57c426469",
  },
  {
    name: "sad",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Fsad.gif?alt=media&token=432c1fbd-de6e-4953-b0eb-81481e6cc910",
  },
  {
    name: "angry",
    image:
      "https://firebasestorage.googleapis.com/v0/b/facebook-4c9e0.appspot.com/o/React%20gif%2Fangry.gif?alt=media&token=2277784a-c264-433b-8e51-0114c4ab5e1f",
  },
];

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
      {reactsArray.map((react, idx) => (
        <div key={idx} className="react">
          <img src={react.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default ReactsPopup;
