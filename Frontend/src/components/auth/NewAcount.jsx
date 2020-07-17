import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const NewAccount = (props) => {

  const authContext = useContext(AuthContext)
  const {message, logged, registerUser} = authContext; 
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
    name: "",
    email: "",
    password: "",
    confirm: "",
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
    if(user.password.length < 6){
      showAlert(`password must contain 6 characters or more`, 'alerta-error');
      return;
    }
    if(user.password !== user.confirm){
      showAlert(`password and confirm must be equal`, 'alerta-error');
      return;
    }

    registerUser({
      name: user.name,
      email: user.email,
      password: user.password
    })

  };

  return (
    <div className="form-usuario">
      {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div> ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Create Account</h1>
        <form action="" onSubmit={submit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={changeInput}
              value={user.name}
            />
          </div>
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
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              onChange={changeInput}
              value={user.confirm}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Get Account"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
