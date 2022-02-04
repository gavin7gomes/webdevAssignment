import { ADD_PRODUCT_TO_CART, CHANGE_CARTITEM_QUANTITY } from "../types";

const initialState = {
  cartItems: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      const id = action.payload.id;
      return {
        ...state,
        cartItems: { ...state.cartItems, [id]: action.payload },
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
    default: {
      return state;
    }
  }
};

export default cartReducer;
