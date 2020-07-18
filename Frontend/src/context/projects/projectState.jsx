import React, { useReducer } from "react";
import projectReducer from "./projectReducer";
import ProjectContext from "./projectContex";
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from "../../types";
import clientAxios from "../../config/axios";

const ProjectState = (props) => {
  

  const initialState = {
    projects: [],
    form: false,
    errorForm: false,
    project: null,
    message: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };

  const getProjects = async () => {
    try {
      const result = await clientAxios.get("/api/projects");
      result.data.projects.map ( p => p.id = p._id); 
      dispatch({
        type: GET_PROJECTS,
        payload: result.data.projects,
      });
    } catch (error) {
      dispatchError();
    }
  };

  const addProject = async (project) => {
    try {
      const result = await clientAxios.post("/api/projects", project);
      result.data.id = result.data._id 
      dispatch({
        type: ADD_PROJECT,
        payload: result.data,
      });
    } catch (error) {
      dispatchError();
    }
  };

  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  const setActualProject = (project) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: project,
    });
  };

  const deleteProject = async (project) => {
    try {
      console.log(project);
      await clientAxios.delete(`/api/projects/${project.id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: project,
      });
    } catch (error) {
      dispatchError();
    }
  };

  const dispatchError = () => {
    const alert = {
      msg: 'There was an error',
      category: 'alerta-error'
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: alert,
    });
  }

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        errorForm: state.errorForm,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        showError,
        setActualProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
