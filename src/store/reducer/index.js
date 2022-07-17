import { combineReducers } from "redux";
import profileReducer from "store/reducer/profileReducer";
import campaignsReducer from "store/reducer/campaignsReducer";

const rootReducer = combineReducers({
  profile: profileReducer,
  campaigns: campaignsReducer,
});

export default rootReducer;
