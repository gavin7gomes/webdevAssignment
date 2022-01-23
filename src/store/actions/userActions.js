import { USER_LOGIN } from "../types";

export const loginUser = (email) => (dispatch, getState) => {
  dispatch({
    type: USER_LOGIN,
    payload: email,
  });
};
