const BinLeftSideMenuItem = ({ Icon, title, SecondIcon }) => {
  return (
    <div className="BinLeftSideMenuItem-wrapper hover1">
      <Icon />
      <p>{title}</p>
      {SecondIcon && (
        <div className="second-icon">
          <SecondIcon />
        </div>
      )}
    </div>
  );
};

export default BinLeftSideMenuItem;
