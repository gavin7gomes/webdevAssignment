import { products } from "../../data";
import { SET_SESSION_ID, USER_LOGIN } from "../types";
import { fetchProducts } from "./productActions";

export const loginUser = (email) => (dispatch, getState) => {
  dispatch({
    type: USER_LOGIN,
    payload: email,
  });
  dispatch({
    type: SET_SESSION_ID,
    payload: "mysecretsessionId",
  });
  localStorage.setItem("sessionId", "mysecretsessionId");
  dispatch(fetchProducts());
};

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOGIN,
    payload: "",
  });
  dispatch({
    type: SET_SESSION_ID,
    payload: "",
  });
  localStorage.removeItem("sessionId");
};
