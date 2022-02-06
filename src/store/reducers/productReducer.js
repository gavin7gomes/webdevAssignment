import {
  READJUST_PRODUCT_IN_STOCK,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
} from "../types";

const initialState = {
  allProducts: {},
  currentProduct: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case READJUST_PRODUCT_IN_STOCK: {
      const cartItems = action.payload;
      const allProducts = state.allProducts;
      let newAllProducts = allProducts;
      Object.keys(cartItems).forEach((id) => {
        newAllProducts = {
          ...newAllProducts,
          [id]: {
            ...allProducts[id],
            in_stock: allProducts[id].in_stock - cartItems[id].quantity,
          },
        };
      });
      return {
        ...state,
        allProducts: newAllProducts,
      };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
