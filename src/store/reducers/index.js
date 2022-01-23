import { combineReducers } from "redux";

import userReducer from "./userReducer";

global.reduxLog = [];

export default combineReducers({
  user: userReducer,
});
