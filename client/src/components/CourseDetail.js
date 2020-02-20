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
    if (this.state) {
      const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId
      } = this.state.course;
    }
    return (
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
              <h3 className="course--title">Course Title</h3>
              <p>By Course Author</p>
            </div>
            <div className="course--description">
              <p>Course Description</p>
              // ? Why does this return null //{console.log(this.state.course)}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>500 years</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>material 1</li>
                    <li>material 2</li>
                    <li>material 3</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
