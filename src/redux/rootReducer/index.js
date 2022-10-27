import { combineReducers } from "redux";
import { userReducer, postsReducer, profileReducer } from "../reducers";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  profile: profileReducer,
});

export default rootReducer;
