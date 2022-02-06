import { ADD_NEW_ORDER } from "../types";

const initialState = {
  allOrders: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER: {
      const id = action.payload.orderId;
      return {
        ...state,
        allOrders: { ...state.allOrders, [id]: action.payload },
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
