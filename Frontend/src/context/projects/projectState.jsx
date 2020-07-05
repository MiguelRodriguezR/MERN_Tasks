import React, { useReducer } from "react";
import projectReducer from "./projectReducer";
import ProjectContext from "./projectContex";
import { FORM_PROJECT, GET_PROJECTS } from "../../types";



const ProjectState = (props) => {

  const projectsELL = [
    { id: 1, name: "t1" },
    { id: 2, name: "t2" },
    { id: 3, name: "t3" },
  ];

  const initialState = {
    projects: [],
    form: false,
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

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        showForm,
        getProjects,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
