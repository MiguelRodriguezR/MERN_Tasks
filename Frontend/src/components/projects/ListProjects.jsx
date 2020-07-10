import React, { useContext, useEffect } from "react";
import Project from "./Project";
import ProjectContext from "../../context/projects/projectContex";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListProjects = () => {
  const { projects, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  if (projects.length === 0)
    return (
      <p>
        No projects{" "}
        <span role="img" aria-label="sad">
          😔
        </span>{" "}
        , add one to start
      </p>
    );

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
      {projects.map((project) => (
        <CSSTransition key={project.id} timeout={200} classNames="proyecto">
          <Project  project={project}></Project>
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProjects;
