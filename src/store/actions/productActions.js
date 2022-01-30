import { products } from "../../data";
import { SET_ALL_PRODUCTS, SET_CURRENT_PRODUCT } from "../types";

export const fetchProducts = (products) => (dispatch, getState) => {
  dispatch({
    type: SET_ALL_PRODUCTS,
    payload: products,
  });
};

export const fetchProductById = (id) => (dispatch, getState) => {
  const currProduct = products.find((product) => product.id === id);
  dispatch({
    type: SET_CURRENT_PRODUCT,
    payload: currProduct,
  });
};
