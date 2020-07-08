import React from "react";

import TaskReducer from "./taskReducer";
import { useReducer } from "react";
import TaskContext from "./taskContext";
import { PROJECT_TASKS, ADD_TASK, VALIDATE_TASK } from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { name: "e1as sda", complete: true, projectId: 1 },
      { name: "e2cdd", complete: false, projectId: 2 },
      { name: "e3avc", complete: true, projectId: 3 },
      { name: "e1ssdbb", complete: true, projectId: 1 },
      { name: "e2zzx", complete: false, projectId: 1 },
      { name: "e3cs", complete: true, projectId: 3 },
    ],
    tasksProject: null,
    errorTask: false
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getProjectTasks = (projectId) => {
    dispatch({
        type: PROJECT_TASKS,
        payload: projectId
    })
  } 

  const addTask = (task) => {
    dispatch({
        type: ADD_TASK,
        payload: task
    })
  }
  
  const validateTask = () => {
    dispatch({
        type: VALIDATE_TASK,
    })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        tasksProject: state.tasksProject,
        errorTask:  state.errorTask,
        getProjectTasks,
        addTask,
        validateTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
