import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  ERROR_LOGIN,
  GET_USER,
  SUCCESS_LOGIN,
  LOGOUT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
    case SUCCESS_REGISTER:
      localStorage.setItem(
        "token",
        action.payload ? action.payload.token : null,
      );
      return {
        ...state,
        loading:false,
        logged: true,
        message: null,
      };
    case ERROR_LOGIN:
    case ERROR_REGISTER:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        logged: null,
        loading: false,
        message: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        loading:false,
        logged: true,
        user: action.payload,
      };
    default:
      return state;
  }
};
