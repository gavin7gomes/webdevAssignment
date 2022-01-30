import { ADD_PRODUCT_TO_CART, CHANGE_CARTITEM_QUANTITY } from "../types";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case CHANGE_CARTITEM_QUANTITY: {
      const { id, count } = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
