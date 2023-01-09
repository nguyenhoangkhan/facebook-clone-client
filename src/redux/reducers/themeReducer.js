const initialState = {
  theme: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "default",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_TO_DARK_THEME":
      return {
        ...state,
        theme: "dark",
      };
    case "CHANGE_TO_DEFAULT_THEME":
      return {
        ...state,
        theme: "default",
      };
    default:
      return state;
  }
};

export default themeReducer;
