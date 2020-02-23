import React, { Component } from "react";
import { Link } from "react-router-dom";
import NewCourseButton from "./NewCourseButton";

export default class Courses extends Component {
  state = {
    courses: null
  };

  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses().then(courses => {
      this.setState({ courses });
    });
  }

  render() {
    const { courses } = this.state;

    return (
      <div className="bounds">
        {courses === null ? (
          <h1>Loading...</h1>
        ) : (
          courses.map(course => {
            return (
              <div className="grid-33" key={course.id}>
                <Link
                  className="course--module course--link"
                  to={"/courses/" + course.id}
                >
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            );
          })
        )}
        <NewCourseButton />
      </div>
    );
  }
}
