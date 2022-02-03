import { SET_ALL_PRODUCTS, SET_CURRENT_PRODUCT } from "../types";

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
    default: {
      return state;
    }
  }
};

export default productReducer;
