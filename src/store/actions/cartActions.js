import { ADD_PRODUCT_TO_CART, CHANGE_CARTITEM_QUANTITY } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();

  if (cartItems[product.id]) {
    return;
  }

  let cartProduct = product;
  cartProduct["quantity"] = 1;
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
