import { useMediaQuery } from "react-responsive";

const GenderSelect = ({ handleRegisterChange, errorGender }) => {
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
      style={{ marginBottom: `${errorGender && !view3 ? "70px" : "0"}` }}
    >
      <label htmlFor="male">
        Nam
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Nữ
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        Tùy chỉnh
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleRegisterChange}
        />
      </label>
      {errorGender && (
        <div
          className={
            view3 ? "input_error input_error_select_large" : "input_error"
          }
          style={{ top: `${!view3 && errorGender && "79px"}` }}
        >
          {" "}
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>{" "}
          {errorGender}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;
