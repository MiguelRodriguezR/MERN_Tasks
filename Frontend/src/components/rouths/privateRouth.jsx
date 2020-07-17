import React, { useEffect } from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRouth = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { logged,loading, loggedUser  } = authContext;

  useEffect(()=>{
    loggedUser();
    // eslint-disable-next-line
  },[])

  return (
    <Route
      {...props}
      render={(props) =>
        !logged && !loading ? (
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default PrivateRouth;
