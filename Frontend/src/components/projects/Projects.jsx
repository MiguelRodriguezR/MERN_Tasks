import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import FormTask from "../tasks/FormTask";
import ListTasks from "../tasks/ListTasks";
import AuthContext from "../../context/auth/authContext";

const Projects = () => {

  const authContext = useContext(AuthContext);
  const { loggedUser } = authContext;

  useEffect(()=>{
    loggedUser();
    // eslint-disable-next-line
  },[])

  return (
    <div className="contenedor-app">
      <Sidebar></Sidebar>
      <div className="seccion-principal">
        <Bar></Bar>
        <main className="">
          <FormTask></FormTask>
          <div className="contenedor-tareas">
              <ListTasks></ListTasks>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
