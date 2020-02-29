import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

//Import Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";
import CreateCourse from "./components/CreateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";

//Give components Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route exact path="/courses" component={CoursesWithContext} />
        <PrivateRoute
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <Route
          exact
          path="/courses/:id"
          render={props => <CourseDetailWithContext {...props} />}
        />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/forbidden" component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
