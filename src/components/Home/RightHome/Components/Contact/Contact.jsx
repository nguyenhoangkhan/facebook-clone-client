const Contact = ({ user }) => {
  return (
    <div className="contact hover2">
      <div className="contact_img">
        <img src={user.picture} alt="" />
      </div>
      <p>
        {user.first_name} {user.last_name}
      </p>
    </div>
  );
};
export default Contact;
