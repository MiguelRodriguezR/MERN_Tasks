import React, { Fragment } from "react";
import Task from "./Task";

const ListTasks = () => {
 const tasks = [
    { name: 'e1', complete: true },
    { name: 'e2', complete: false },
    { name: 'e3', complete: true },
  ];

  return (
    <Fragment>
      <h2> Project: t1</h2>
      <ul className="listado-tareas">
        {tasks.length === 0 ? (
          <li className="tarea"> No Tasks </li>
        ) : (
          tasks.map((task) => <Task task={task}></Task>)
        )}
        
      </ul>

      <button className="btn btn-eliminar"> Delete Project &times;</button>
    </Fragment>
  );
};

export default ListTasks;
