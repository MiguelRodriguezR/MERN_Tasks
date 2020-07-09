import React, { Fragment, useContext } from "react";
import Task from "./Task";
import ProjectContext from "../../context/projects/projectContex";
import TaskContext from "../../context/tasks/taskContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListTasks = () => {
  const projectContext = useContext(ProjectContext);
  const { project, deleteProject } = projectContext;

  const tasksContext = useContext(TaskContext);
  const { tasksProject } = tasksContext;

  if (!project) return <h2>Select a Project</h2>;

  const deleteP = () => {
    deleteProject(project);
  };

  return (
    <Fragment>
      <h2> Project: {project.name}</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0 ? (
          <li className="tarea"> No Tasks </li>
        ) : (
          <TransitionGroup>
            {tasksProject.map((task) => (
              <CSSTransition key={task.id} timeout={200} classNames="tarea">
                <Task task={task}></Task>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="btn btn-eliminar" onClick={deleteP}>
        {" "}
        Delete Project &times;
      </button>
    </Fragment>
  );
};

export default ListTasks;
