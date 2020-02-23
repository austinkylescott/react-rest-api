import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    course: {
      User: {}
    },
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;

    context.data
      .getCourse(this.state.id)
      .then(course => {
        this.setState({ course });
      })
      .catch(err => this.props.history.push("/error"));
  }

  render() {
    const { id, course, errors } = this.state;
    console.log(errors);
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
                    <Link className="button" to={`/courses/${id}/update`}>
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
                  <h3 className="course--title">{course.title}</h3>
                  <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                </div>
                <div className="course--description">
                  <p>{course.description}</p>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      {course.estimatedTime === null ? (
                        <h3>No estimated time provided</h3>
                      ) : (
                        <h3>{course.estimatedTime}</h3>
                      )}
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      {course.materialsNeeded === null ? (
                        <h3>No required materials provided</h3>
                      ) : (
                        <ul>
                          <li>{course.materialsNeeded}</li>
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
