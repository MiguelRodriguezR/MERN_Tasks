import React, { useContext, useEffect } from "react";
import Project from "./Project";
import ProjectContext from "../../context/projects/projectContex";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AlertContext from "../../context/alerts/alertContext";

const ListProjects = () => {
  const { message, projects, getProjects } = useContext(ProjectContext);
  const { alert, showAlert } = useContext(AlertContext);

  useEffect(() => {
    if(message){
      showAlert(message.msg,message.category);
    }

    getProjects();
    // eslint-disable-next-line
  }, [message]);

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
      {alert ? ( <div className={`alerta ${alert.category}`}>{alert.msg}</div> ) : null}
      <TransitionGroup>
      {projects.map((project) => (
        <CSSTransition key={project._id} timeout={200} classNames="proyecto">
          <Project  project={project}></Project>
        </CSSTransition>
      ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProjects;
