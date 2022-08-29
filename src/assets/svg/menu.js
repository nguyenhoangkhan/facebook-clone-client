function Menu({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 44 44">
      <circle className={className} cx="7" cy="7" r="6"></circle>
      <circle className={className} cx="22" cy="7" r="6"></circle>
      <circle className={className} cx="37" cy="7" r="6"></circle>
      <circle className={className} cx="7" cy="22" r="6"></circle>
      <circle className={className} cx="22" cy="22" r="6"></circle>
      <circle className={className} cx="37" cy="22" r="6"></circle>
      <circle className={className} cx="7" cy="37" r="6"></circle>
      <circle className={className} cx="22" cy="37" r="6"></circle>
      <circle className={className} cx="37" cy="37" r="6"></circle>
    </svg>
  );
}

export default Menu;
