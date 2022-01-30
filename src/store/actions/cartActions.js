import { ADD_PRODUCT_TO_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const {
    cart: { cartItems },
  } = getState();
  let alreadyAddedToCart = false;
  cartItems.forEach((i) => {
    if (i.id === product.id) {
      alreadyAddedToCart = true;
      return;
    }
  });
  if (alreadyAddedToCart) {
    return;
  }

  product["quantity"] = 1;
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  });
};

export const changeCartItemQuantity = (id, count) => (dispatch, getState) => {
  dispatch({
    type: ADD_PRODUCT_TO_CART,
    payload: { id, count },
  });
};
