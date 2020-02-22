import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CourseDetail extends Component {
  componentDidMount() {
    const { context, courseID } = this.props;
    context.data.getCourse(courseID).then(course => {
      this.setState({ course });
    });
  }

  render() {
    return (
      <div>
        {this.state === null ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <hr />
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <Link className="button" to="/">
                      Update Course
                    </Link>
                    <Link className="button" to="#">
                      Delete Course
                    </Link>
                  </span>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{this.state.course.title}</h3>
                  <p>
                    By{" "}
                    {`${this.state.course.User.firstName} ${this.state.course.User.lastName}`}
                  </p>
                </div>
                <div className="course--description">
                  <p>{this.state.course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      {this.state.course.estimatedTime === null ? (
                        <h3>No estimated time provided</h3>
                      ) : (
                        <h3>{this.state.course.estimatedTime}</h3>
                      )}
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      {this.state.course.materialsNeeded === null ? (
                        <h3>No required materials provided</h3>
                      ) : (
                        <ul>
                          <li>{this.state.course.materialsNeeded}</li>
                        </ul>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
