import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import NewAccount from "../auth/NewAcount";
import Projects from "../projects/Projects";
import ProjectState from "../../context/projects/projectState";
import TaskState from "../../context/tasks/taskState";
import AlertState from "../../context/alerts/alertState";
import AuthProvider from "../../context/auth/authState";
import tokenAuth from "../../config/tokenAuth";
import PrivateRouth from "../rouths/privateRouth";

const token = localStorage.getItem('token');

if(token){
  tokenAuth(token);
}

const Main = () => {

  return (
    <AuthProvider>
      <AlertState>
        <TaskState>
          <ProjectState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/new-account" component={NewAccount}></Route>
                <PrivateRouth exact path="/projects" component={Projects}></PrivateRouth>
              </Switch>
            </Router>
          </ProjectState>
        </TaskState>
      </AlertState>
    </AuthProvider>
  );
};

export default Main;
