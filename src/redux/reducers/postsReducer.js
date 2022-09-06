const initialState = {
  posts: [],
  loading: false,
  error: "",
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "POST_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: "",
      };
    case "POST_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
