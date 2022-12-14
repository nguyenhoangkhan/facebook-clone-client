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
    case "UPDATE_COVER_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          cover: action.payload,
        },
      };
    case "UPDATE_DETAILS_PROFILE":
      return {
        ...state,
        profile: {
          ...state.profile,
          details: action.payload,
        },
      };
    case "PROFILE_POST_SUCCESS":
      return {
        ...state,
        profile: {
          ...state.profile,
          post: action.payload,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
