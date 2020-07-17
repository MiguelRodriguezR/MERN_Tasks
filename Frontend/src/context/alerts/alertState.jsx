import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { SHOW_ALERT, HIDE_ALERT } from "../../types";

const AlertState = (props) => {
  const intialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, intialState);

  const showAlert = (msg, category) => {
      dispatch({
          type: SHOW_ALERT,
          payload: {
              msg,
              category
          }
      })

      setTimeout(() => {
          dispatch({
              type: HIDE_ALERT
          })
      }, 5000)
  }

  return (
    <AlertContext.Provider value={{ alert: state.alert, showAlert}}> {props.children}</AlertContext.Provider>
  );
};

export default AlertState;
