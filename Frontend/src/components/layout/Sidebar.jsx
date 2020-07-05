import React from "react";
import NewProject from "../projects/NewProject";
import ListProjects from "../projects/ListProjects";

const Sidebar = () => {
  return (
    <aside className="">
      <h1>
        MERN <span>Tasks</span>
      </h1>
      <NewProject></NewProject>
      <div className="proyectos">
        <h2>Your Projects </h2>
        <ListProjects></ListProjects>
      </div>
    </aside>
  );
};

export default Sidebar;
