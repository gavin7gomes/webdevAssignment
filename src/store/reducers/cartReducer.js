import {
  ADD_PRODUCT_TO_CART,
  CHANGE_CARTITEM_QUANTITY,
  EMPTY_YOUR_CART,
  REMOVE_PRODUCT_FROM_CART,
} from "../types";

const initialState = {
  cartItems: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const id = action.payload.id;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [id]: { ...action.payload, quantity: 1 },
        },
      };
    }
    case CHANGE_CARTITEM_QUANTITY: {
      const { id, count } = action.payload;
      const item = state.cartItems[id];
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [id]: { ...item, quantity: count },
        },
      };
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const tempState = state.cartItems;
      delete tempState[action.payload];
      return {
        ...state,
        cartItems: tempState,
      };
    }
    case EMPTY_YOUR_CART: {
      return {
        ...state,
        cartItems: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
