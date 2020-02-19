import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Courses extends Component {
  componentDidMount() {
    const { context } = this.props;
    context.data.getCourses().then(courses => {
      this.setState({ courses });
    });
  }

  render() {
    return (
      <div className="bounds">
        {this.state === null ? (
          <h1>Loading...</h1>
        ) : (
          this.state.courses.map(course => {
            return (
              <div className="grid-33" key={course.id}>
                <Link className="course--module course--link" to="/">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
