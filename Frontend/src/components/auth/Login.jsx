import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alerts/alertContext";

const Login = (props) => {

  const authContext = useContext(AuthContext)
  const {message, logged, login} = authContext; 
  const alertContext = useContext(AlertContext);
  const {alert, showAlert} = alertContext; 


  useEffect(()=>{
    if(logged){
      props.history.push('/projects')
    }
    if(message){
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  },[message, logged, props.history])



  const [user, saveUser] = useState({
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    saveUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const emptyField = Object.entries(user).find( f => f[1].trim() === '');
    if(emptyField){
      showAlert(`${emptyField[0]} is required`, 'alerta-error');
      return;
    }

    login(user)

  };

  return (
    <div className="form-usuario">
      {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div> ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>User Login</h1>
        <form action="" onSubmit={submit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={changeInput}
              value={user.email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={changeInput}
              value={user.password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Login"
            />
          </div>
        </form>

        <Link to={"/new-account"} className="enlace-cuenta">
          Get Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
