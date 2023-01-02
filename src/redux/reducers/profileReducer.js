const initialState = {
  profile: null,
  loading: false,
  error: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "PROFILE_SUCCESS":
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: "",
      };
    case "PROFILE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_PICTURE_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          picture: action.payload,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;