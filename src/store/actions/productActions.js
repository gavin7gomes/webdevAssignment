import {
  READJUST_PRODUCT_IN_STOCK,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
} from "../types";
import axios from "axios";
import { service } from "../../utils/utils";

export const fetchProducts = (token) => async (dispatch, getState) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/products/`, config);
    const products = data.reduce(
      (acc, obj) => Object.assign(acc, { [obj.id]: obj }),
      {}
    );
    dispatch({
      type: SET_ALL_PRODUCTS,
      payload: products,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchProductById = (id) => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/products/${id}`,
      config
    );
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
