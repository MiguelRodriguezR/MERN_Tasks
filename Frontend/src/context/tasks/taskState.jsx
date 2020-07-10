import React from "react";
import uuid from 'uuid';
import TaskReducer from "./taskReducer";
import { useReducer } from "react";
import TaskContext from "./taskContext";
import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  TASK_STATE,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1,  name: "e1as sda", complete: true, projectId: 1 },
      { id: 2,  name: "e2cdd", complete: false, projectId: 2 },
      { id: 3,  name: "e3avc", complete: true, projectId: 3 },
      { id: 4,  name: "e1ssdbb", complete: true, projectId: 1 },
      { id: 5, name: "e2zzx", complete: false, projectId: 1 },
      { id: 6,  name: "e3cs", complete: true, projectId: 3 },
    ],
    tasksProject: null,
    errorTask: false,
    selectedTask: null
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getProjectTasks = (projectId) => {
    dispatch({
      type: PROJECT_TASKS,
      payload: projectId,
    });
  };

  const addTask = (task) => {
    task.id = uuid.v4()
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };
  
  const deleteTask = (idTask) => {
    dispatch({
      type: DELETE_TASK,
      payload: idTask,
    });
  };
  
  const changeTaskState = (task) => {
    dispatch({
      type: TASK_STATE,
      payload: task,
    });
  };
  
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };
  
  const updateTask = (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };
  
  const cleanActualTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        tasksProject: state.tasksProject,
        errorTask: state.errorTask,
        selectedTask: state.selectedTask,
        getProjectTasks,
        addTask,
        validateTask,
        deleteTask,
        changeTaskState,
        saveActualTask,
        updateTask,
        cleanActualTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
