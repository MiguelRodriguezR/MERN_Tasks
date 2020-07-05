import React from "react";
import Sidebar from "../layout/Sidebar";
import Bar from "../layout/Bar";
import FormTask from "../tasks/FormTask";
import ListTasks from "../tasks/ListTasks";

const Projects = () => {



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
