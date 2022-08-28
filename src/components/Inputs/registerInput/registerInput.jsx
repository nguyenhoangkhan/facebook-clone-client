import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ placeholder, bottom, right, ...props }) => {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width: 850px)",
  });

  return (
    <div className="input_wrap input_register_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            right && desktopView
              ? "input_error input_error_right"
              : desktopView
              ? "input_error input_error_desktop"
              : "input_error"
          }
          style={{ transform: "translateY(3px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                right && desktopView
                  ? "error_arrow_right"
                  : desktopView
                  ? "error_arrow_left"
                  : "error_arrow_top"
              }
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "inputError_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_right" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon error_icon_register"
          style={{ top: `${!bottom && !desktopView ? "66%" : "10px"}` }}
        ></i>
      )}
    </div>
  );
};
export default RegisterInput;
