import axios from "axios";
import { ADD_NEW_ORDER } from "../types";

export const placeOrder = (orderData) => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };

  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/order/`,
      orderData,
      config
    );

    console.log("place order", res);
    return { success: true, data: res.data };
  } catch (error) {
    alert(error);
    return error;
  }
};

export const createOrderItems = (orderData) => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };

  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/order/items`,
      orderData,
      config
    );

    console.log("craete order items", res);
  } catch (error) {
    alert(error);
    return error;
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };

  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/order/`, config);

    console.log("get order", data);

    const newData = data.reduce((acc, obj) => {
      return Object.assign(acc, { [obj.id]: obj });
    }, {});

    dispatch({
      type: ADD_NEW_ORDER,
      payload: newData,
    });
  } catch (error) {
    alert(error);
    return error;
  }
};

export const getOrderDetailsById = (id) => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };

  try {
    const res = await axios.get(`http://127.0.0.1:8000/order/${id}`, config);

    console.log("order details", res);
    return { success: true, data: res.data };
  } catch (error) {
    alert(error);
    return error;
  }
};

export const getOrderItemsByOrderId = (id) => async (dispatch, getState) => {
  const {
    user: { sessionId },
  } = getState();
  const config = {
    headers: {
      Authorization: `Token ${sessionId}`,
    },
  };

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/order/items/${id}`,
      config
    );

    console.log("order items", res);
    return { success: true, dataa: res.data };
  } catch (error) {
    alert(error);
    return error;
  }
};
