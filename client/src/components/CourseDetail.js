import React, { Component } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
export default class CourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    course: null,
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;

    context.data
      .getCourse(this.state.id)
      .then(course => {
        this.setState({ course });
      })
      .catch(err => this.props.history.push("/notfound"));
  }

  render() {
    const { id, course } = this.state;
    const { context } = this.props;
    const { authenticatedUser } = context;

    return (
      <div>
        {course === null ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <hr />
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {authenticatedUser &&
                  authenticatedUser.username === course.User.emailAddress ? (
                    <span>
                      <Link className="button" to={`/courses/${id}/update`}>
                        Update Course
                      </Link>
                      <Link
                        className="button"
                        to={`/courses/`}
                        onClick={this.delete}
                      >
                        Delete Course
                      </Link>
                    </span>
                  ) : null}

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
                  <Markdown source={course.description} />
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
                        <Markdown source={course.materialsNeeded} />
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

  delete = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;

    const { id } = this.state;

    context.data
      .deleteCourse(id, authenticatedUser.username, authenticatedUser.password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors.error });
        } else {
          //forces main page to reload
          window.location.href = "/";
        }
      })
      .catch(errors => {
        this.props.history.push("/error");
      });
  };
}
