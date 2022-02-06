import {
  READJUST_PRODUCT_IN_STOCK,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
} from "../types";

export const fetchProducts = (products) => (dispatch, getState) => {
  dispatch({
    type: SET_ALL_PRODUCTS,
    payload: products,
  });
};

export const fetchProductById = (id) => (dispatch, getState) => {
  const {
    product: { allProducts },
  } = getState();
  const currProduct = allProducts[id];
  dispatch({
    type: SET_CURRENT_PRODUCT,
    payload: currProduct,
  });
};

export const readjustProductInStock = (cartItems) => (dispatch, getState) => {
  dispatch({
    type: READJUST_PRODUCT_IN_STOCK,
    payload: cartItems,
  });
};
