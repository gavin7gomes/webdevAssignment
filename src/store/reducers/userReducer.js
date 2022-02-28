import { SET_SESSION_ID, USER_INFO } from "../types";

const initialState = {
  userInfo: {},
  sessionId: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: action.payload,
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
