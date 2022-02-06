import {
  ADD_PRODUCT_TO_CART,
  CHANGE_CARTITEM_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  EMPTY_YOUR_CART,
} from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  if (cartItems[product.id]) {
    return;
  }

  let cartProduct = product;
  // cartProduct["quantity"] = 1;
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: cartProduct,
  });
};

export const changeCartItemQuantity = (id, count) => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  if (!cartItems[id]) {
    return;
  }
  dispatch({
    type: CHANGE_CARTITEM_QUANTITY,
    payload: { id, count },
  });
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id,
  });
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_YOUR_CART,
    payload: {},
  });
};
