import { useField, ErrorMessage } from "formik";
const LoginInput = ({ placeholder, error, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <input
        className={
          (meta.touched && meta.error) || error ? "inputError_border" : ""
        }
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <ErrorMessage
          component="span"
          className="error_input_message"
          name={field.name}
        />
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
};
export default LoginInput;
