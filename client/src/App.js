import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

//Import Components

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

//Give components Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CoursesWithContext} />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
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
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
      </Switch>
    </div>
  </Router>
);
