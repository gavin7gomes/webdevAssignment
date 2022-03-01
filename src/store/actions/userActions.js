import axios from "axios";
import { SET_SESSION_ID, USER_INFO } from "../types";
import { fetchProducts } from "./productActions";

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`http://127.0.0.1:8000/user/login`, {
      email,
      password,
    });
    dispatch({
      type: SET_SESSION_ID,
      payload: data.token,
    });
    localStorage.setItem("pharmacyApp7SessionId", data.token);
    await dispatch(getUserDetails(data.token));
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const logoutUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_INFO,
    payload: {},
  });
  dispatch({
    type: SET_SESSION_ID,
    payload: "",
  });
  localStorage.removeItem("pharmacyApp7SessionId");
};

export const getUserDetails = (token) => async (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const { data } = await axios.get(`http://127.0.0.1:8000/user/me`, config);

  dispatch({
    type: USER_INFO,
    payload: data,
  });
  dispatch({
    type: SET_SESSION_ID,
    payload: token,
  });
  await dispatch(fetchProducts(token));
};

export const registerUser =
  (email, password, password2, firstName, lastName) =>
  async (dispatch, getState) => {
    try {
      const body = {
        username: email,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        password2: password2,
      };
      const res = await axios.post(`http://127.0.0.1:8000/user/create`, body);
      console.log("lllllll", res);
      return res;
    } catch (error) {
      return error;
    }
  };
