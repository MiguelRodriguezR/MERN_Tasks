import React, { useContext } from "react";
import TaskContext from "../../context/tasks/taskContext";
import ProjectContext from "../../context/projects/projectContex";

const Task = ({ task }) => {

  const tasksContext = useContext(TaskContext);
  const { deleteTask, getProjectTasks, changeTaskState, saveActualTask } = tasksContext;

  const projectContext = useContext(ProjectContext);
  const {project} = projectContext;

  const deteT = () => {
    deleteTask(task.id);
    getProjectTasks(project.id)
  }

  const modifyState =() =>{
    task.complete = !task.complete
    changeTaskState(task);
  }

  const selectTask = () => {
    saveActualTask(task)
  }

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.complete ? (
          <button type="button" className="completo" onClick={modifyState}>
            Complete
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={modifyState}>
            Incomplete
          </button>
        )}
      </div>
      <div className="acciones">
          <button className="btn btn-primario" onClick={selectTask}>Edit</button>
          <button className="btn btn-secundario" onClick={deteT} >Delete</button>
      </div>
    </li>
  );
};

export default Task;
