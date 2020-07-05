import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
  };

  return (
    <div className="form-usuario">
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
