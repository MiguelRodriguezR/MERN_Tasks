import React, { Fragment, useContext } from "react";
import Task from "./Task";
import ProjectContext from "../../context/projects/projectContex";
import TaskContext from "../../context/tasks/taskContext";

const ListTasks = () => {
  const projectContext = useContext(ProjectContext);
  const {project, deleteProject} = projectContext;

  const tasksContext = useContext(TaskContext);
  const {tasksProject} = tasksContext;

  if(!project) return <h2>Select a Project</h2>

  const deleteP = () => {
    deleteProject(project);
  }

  return (
    <Fragment>
      <h2> Project: {project.name}</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0 ? (
          <li className="tarea"> No Tasks </li>
        ) : (
          tasksProject.map((task) => <Task task={task}></Task>)
        )}
        
      </ul>

      <button className="btn btn-eliminar" onClick={deleteP}> Delete Project &times;</button>
    </Fragment>
  );
};

export default ListTasks;
