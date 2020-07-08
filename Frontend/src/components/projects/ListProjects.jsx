import React, { useContext, useEffect } from "react";
import Project from "./Project";
import ProjectContext from "../../context/projects/projectContex";

const ListProjects = () => {
  const { projects, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    getProjects();
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
      {projects.map((project) => (
        <Project key={project.id} project={project}></Project>
      ))}
    </ul>
  );
};

export default ListProjects;
