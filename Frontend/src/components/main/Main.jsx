import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import NewAccount from "../auth/NewAcount";
import Projects from "../projects/Projects";
import ProjectState from "../../context/projects/projectState";
import TaskState from "../../context/tasks/taskState";

const Main = () => {
  return (
    <TaskState>
      <ProjectState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/new-account" component={NewAccount}></Route>
            <Route exact path="/projects" component={Projects}></Route>
          </Switch>
        </Router>
      </ProjectState>
    </TaskState>
  );
};

export default Main;
