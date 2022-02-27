import {
  READJUST_PRODUCT_IN_STOCK,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
} from "../types";
import axios from "axios";
import { service } from "../../utils/utils";

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/products/`);
    dispatch({
      type: SET_ALL_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchProductById = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/products/${id}`);
    console.log("qqq", data);
    dispatch({
      type: SET_CURRENT_PRODUCT,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const readjustProductInStock = (cartItems) => (dispatch, getState) => {
  dispatch({
    type: READJUST_PRODUCT_IN_STOCK,
    payload: cartItems,
  });
};
