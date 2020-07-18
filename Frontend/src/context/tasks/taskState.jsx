import React from "react";
// import uuid from 'uuid';
import TaskReducer from "./taskReducer";
import { useReducer } from "react";
import TaskContext from "./taskContext";
import {
  PROJECT_TASKS,
  ADD_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  UPDATE_TASK,
  CLEAN_TASK,
} from "../../types";
import clientAxios from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    // tasks: [
    //   { id: 1,  name: "e1as sda", complete: true, projectId: 1 },
    //   { id: 2,  name: "e2cdd", complete: false, projectId: 2 },
    //   { id: 3,  name: "e3avc", complete: true, projectId: 3 },
    //   { id: 4,  name: "e1ssdbb", complete: true, projectId: 1 },
    //   { id: 5, name: "e2zzx", complete: false, projectId: 1 },
    //   { id: 6,  name: "e3cs", complete: true, projectId: 3 },
    // ],
    tasksProject: [],
    errorTask: false,
    selectedTask: null
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getProjectTasks = async (projectId) => {
    try {
      const result = await clientAxios.get(`/api/tasks/`, { params: {project: projectId}});
      result.data.tasks.map( t => t.id = t._id);
      dispatch({
        type: PROJECT_TASKS,
        payload: result.data.tasks,
      });
    } catch (error) {
      
    }
   
  };

  const addTask = async (task) => {
    // task.id = uuid.v4();
    try {
      const result = await clientAxios.post('/api/tasks', task);
      result.data.task.id = result.data.task._id;
      dispatch({
        type: ADD_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      
    }
    
  };

  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };
  
  const deleteTask = async (idTask, project) => {
    try {
      await clientAxios.delete(`/api/tasks/${idTask}`, {params: {project}});
      dispatch({
        type: DELETE_TASK,
        payload: idTask,
      });
    } catch (error) {
      
    }
    
  };
  
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };
  
  const updateTask = async (task) => {
    try {
      const result = await clientAxios.put(`/api/tasks/${task.id}`, task);
      result.data.task.id = result.data.task._id;
      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      
    }
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
