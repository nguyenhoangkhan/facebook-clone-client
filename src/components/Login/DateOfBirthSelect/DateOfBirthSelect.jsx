import { useMediaQuery } from "react-responsive";

const DateOfBirthSelect = ({ user, handleRegisterChange, errorBirthDay }) => {
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, idx) => tempYear - idx);
  const months = Array.from(new Array(12), (val, idx) => 12 - idx);
  const dates = Array.from(new Array(31), (val, idx) => 31 - idx);
  const view1 = useMediaQuery({
    query: "(min-width:539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1170px)",
  });
  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${errorBirthDay && !view3 ? "70px" : "0"}` }}
    >
      <select name="bDay" value={user.bDay} onChange={handleRegisterChange}>
        {dates.map((date, i) => (
          <option key={i}>{date}</option>
        ))}
      </select>
      <select name="bMonth" value={user.bMonth} onChange={handleRegisterChange}>
        {months.map((month, i) => (
          <option key={i}>{month}</option>
        ))}
      </select>
      <select name="bYear" value={user.bYear} onChange={handleRegisterChange}>
        {years.map((year, i) => (
          <option key={i}>{year}</option>
        ))}
      </select>
      {errorBirthDay && (
        <div
          className={
            view3 ? "input_error input_error_select_large" : "input_error"
          }
        >
          {" "}
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>{" "}
          {errorBirthDay}
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;
