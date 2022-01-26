import { SET_SESSION_ID, USER_LOGIN } from "../types";

const initialState = {
  email: "",
  sessionId: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case SET_SESSION_ID: {
      return {
        ...state,
        sessionId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
