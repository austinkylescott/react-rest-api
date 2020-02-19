import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from "./logo.svg";

import withContext from "./Context";
import "./App.css";

//Import Components
import Header from "./components/Header";
import Courses from "./components/Courses";

//Give components Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/create" component={CoursesWithContext} />
        <Route path="/courses/:id/update" component={CoursesWithContext} />
        <Route path="/courses/:id" component={CoursesWithContext} />
        <Route path="/signin" component={CoursesWithContext} />
        <Route path="/signup" component={CoursesWithContext} />
        <Route path="/signout" component={CoursesWithContext} />
      </Switch>
    </div>
  </Router>
);
