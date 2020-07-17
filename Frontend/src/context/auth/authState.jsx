import React from "react";
import AuthContext from "./authContext";
import { useReducer } from "react";
import authReducer from "./authReducer";
import {
  ERROR_REGISTER,
  SUCCESS_REGISTER,
  ERROR_LOGIN,
  GET_USER,
  SUCCESS_LOGIN,
  LOGOUT,
} from "../../types";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthProvider = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    logged: null,
    user: null,
    message: null,
    loading: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/api/users", data);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data,
      });

      loggedUser();
    } catch (error) {
      console.log("error auth", error);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_REGISTER,
        payload: alert,
      });
    }
  };

  const loggedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await clientAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
      });
    }
  };

  const login = async (data) => {
    try {
      const response = await clientAxios.post("/api/auth", data);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: response.data,
      });
      loggedUser();
    } catch (error) {
      console.log("error auth", error);
      const alert = {
        msg: error.response.data.errors
          ? error.response.data.errors[0].msg
          : error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_LOGIN,
        payload: alert,
      });
    }
  };

  const logout = async () => {
    dispatch({
      type: LOGOUT,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        logged: state.logged,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        loggedUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
