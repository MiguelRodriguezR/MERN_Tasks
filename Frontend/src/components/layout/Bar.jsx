import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, loggedUser, logout } = authContext;

  useEffect(() => {
    loggedUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hi <span>{user.name}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-session" onClick={() => logout()}> Logout</button>
      </nav>
    </header>
  );
};

export default Bar;
