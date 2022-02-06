import { ADD_NEW_ORDER } from "../types";

export const placeOrder = (orderData) => (dispatch, getState) => {
  dispatch({
    type: ADD_NEW_ORDER,
    payload: orderData,
  });

  return { success: true };
};
