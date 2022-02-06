import { combineReducers } from "redux";

import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

global.reduxLog = [];

export default combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
