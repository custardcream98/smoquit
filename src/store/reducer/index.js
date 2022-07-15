import { combineReducers } from "redux";
import profileReducer from "store/reducer/profileReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
});

export default rootReducer;
