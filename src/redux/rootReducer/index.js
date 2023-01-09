import { combineReducers } from "redux";
import {
  userReducer,
  postsReducer,
  profileReducer,
  themeReducer,
} from "../reducers";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  profile: profileReducer,
  theme: themeReducer,
});

export default rootReducer;
