import { ADD_NEW_ORDER } from "../types";

const initialState = {
  allOrders: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER: {
      return {
        ...state,
        allOrders: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
