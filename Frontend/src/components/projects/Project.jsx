import React, { useContext } from "react";
import ProjectContext from "../../context/projects/projectContex";
import TaskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {

  const projectContext = useContext(ProjectContext);
  const taskContext = useContext(TaskContext);
  const { setActualProject } = projectContext;
  const { getProjectTasks } = taskContext;

  const setProject = (project) => {
    setActualProject(project)
    getProjectTasks(project.id)
  }

  return (
    <li>
      <button className="btn btn-blank" onClick={()=> setProject(project) }>{project.name}</button>
    </li>
  );
};

export default Project;
