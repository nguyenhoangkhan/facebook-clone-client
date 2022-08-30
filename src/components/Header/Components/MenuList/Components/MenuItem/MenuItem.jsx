const MenuItem = ({
  name,
  description,
  icon,
  svg,
  onClick,
  className,
  image,
}) => {
  let Comp = svg;
  let classes = `all_menu_item hover1 ${className}`;
  return (
    <div className={classes} onClick={onClick}>
      {icon && <img src={`../../left/${icon}.png`} alt="" />}
      {image && <img src={image} className="menu-item-img" alt="" />}
      {svg && <Comp />}
      <div className="all_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default MenuItem;
