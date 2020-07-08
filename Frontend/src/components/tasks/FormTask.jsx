import React, { useContext, useState } from "react";
import ProjectContext from "../../context/projects/projectContex";
import TaskContext from "../../context/tasks/taskContext";

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;

  const taskContext = useContext(TaskContext);
  const { errorTask, addTask, validateTask, getProjectTasks } = taskContext;

  const [task,saveTask] = useState({
    name: '',
  })

  if (!project) return null;

  const handleChange = e => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const createTask = (e) => {
    e.preventDefault();

    if(task.name.trim() === ''){
      validateTask();
      return;
    }

    task.projectId = project.id;
    task.state = false;
    addTask(task)
    saveTask({name: ''})
    getProjectTasks(project.id)

  };

  return (
    <div className="formulario">
      <form action="" onSubmit={createTask}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Task Name"
            name="name"
            value = {task.name}
            onChange = {handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Add Task"
          />
        </div>
      </form>
      {errorTask ? <p className="mensaje error">Task name is required</p>: null}
    </div>
  );
};

export default FormTask;
