import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../../context/projects/projectContex";
import TaskContext from "../../context/tasks/taskContext";

const FormTask = () => {
  const projectContext = useContext(ProjectContext);
  const { project } = projectContext;

  const taskContext = useContext(TaskContext);
  const {
    selectedTask,
    errorTask,
    addTask,
    validateTask,
    getProjectTasks,
    updateTask,
    cleanActualTask,
  } = taskContext;

  const [task, saveTask] = useState({
    name: "",
  });

  useEffect(() => {
    if (selectedTask !== null) {
      saveTask(selectedTask);
    } else {
      saveTask({ name: "" });
    }
  }, [selectedTask]);

  if (!project) return null;

  const handleChange = (e) => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const addTaskMethod = () => {
    task.project = project.id;
    task.state = false;
    addTask(task);
  };

  const editTaskMethod = () => {
    updateTask(task);
    cleanActualTask();
  };

  const createTask = (e) => {
    e.preventDefault();

    if (task.name.trim() === "") {
      validateTask();
      return;
    }

    selectedTask ? editTaskMethod() : addTaskMethod();
    saveTask({ name: "" });
    getProjectTasks(project.id);
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
            value={task.name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selectedTask ? "Edit Task" : "Add Task"}
          />
        </div>
      </form>
      {errorTask ? (
        <p className="mensaje error">Task name is required</p>
      ) : null}
    </div>
  );
};

export default FormTask;
