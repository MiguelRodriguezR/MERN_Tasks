import React, { useReducer } from "react";
import projectReducer from "./projectReducer";
import ProjectContext from "./projectContex";
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT } from "../../types";
import uuid from 'uuid';


const ProjectState = (props) => {

  const projectsELL = [
    { id: 1, name: "t1" },
    { id: 2, name: "t2" },
    { id: 3, name: "t3" },
  ];

  const initialState = {
    projects: [],
    form: false,
    errorForm: false,
    project: null
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };

  const getProjects = () => {
    dispatch({
        type: GET_PROJECTS,
        payload: projectsELL
      });
  }
 

  const addProject = (project) => {
    project.id = uuid.v4()
    dispatch({
      type: ADD_PROJECT,
      payload: project
    });
  }

  const showError = () => {
    dispatch({
        type: VALIDATE_FORM
      });
  }
  
  const setActualProject = (project) => {
    dispatch({
        type: ACTUAL_PROJECT,
        payload: project
      });
  }
  
  const deleteProject = (project) => {
    dispatch({
        type: DELETE_PROJECT,
        payload: project
      });
  }

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        errorForm: state.errorForm,
        project: state.project,
        showForm,
        getProjects,
        addProject,
        showError,
        setActualProject,
        deleteProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
