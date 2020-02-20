import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";

import withContext from "./Context";
//import "./App.css";

//Import Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignIn from "./components/SignIn";

//Give components Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/create" component={CoursesWithContext} />
        <Route path="/courses/:id/update" component={CoursesWithContext} />
        <Route
          exact
          path="/courses/:id"
          render={props => (
            <CourseDetailWithContext
              {...props}
              courseID={props.match.params.id}
            />
          )}
        />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={CoursesWithContext} />
        <Route path="/signout" component={CoursesWithContext} />
      </Switch>
    </div>
  </Router>
);
