import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/projects/projectContex";

const NewProject = () => {
  const projectContext = useContext(ProjectContext);
  const { form, errorForm, showForm, addProject, showError } = projectContext;

  const [project, saveProject] = useState({
    name: "",
  });

  const onChangeProject = (e) => {
    saveProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const submitProject = (e) => {
    e.preventDefault();

    if(project.name === '' ) {
      showError();
      return; 
    }

    addProject(project);
    saveProject({ name: '' })

  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >
        New Project
      </button>

      {form ? (
        <form
          action=""
          className="formulario-nuevo-proyecto"
          onSubmit={submitProject}
        >
          <input
            type="text"
            className="input-text"
            placeholder="Project Name"
            name="name"
            value={project.name}
            onChange={onChangeProject}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Add Project"
          />
        </form>

      ) : null}
      { errorForm ? <p className="mensaje error">Name is required</p>: null}
    </Fragment>
  );
};

export default NewProject;
