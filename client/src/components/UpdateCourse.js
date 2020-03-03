import React, { Component } from "react";
import Form from "./Form";

export default class UpdateCourse extends Component {
  state = {
    id: this.props.match.params.id,
    title: "",
    firstName: "",
    lastName: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;

    context.data
      .getCourse(this.state.id)
      .then(course => {
        this.setState({
          title: course.title,
          firstName: course.User.firstName,
          lastName: course.User.lastName,
          description: course.description,
          estimatedTime: course.estimatedTime || "",
          materialsNeeded: course.materialsNeeded || "",
          userId: course.User.id
        });
      })
      .catch(err => this.props.history.push("/notfound"));
  }

  render() {
    const {
      title,
      firstName,
      lastName,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div>
        {title === null ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <hr />
            <div className="bounds course--detail">
              <h1>Update Course</h1>
              <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                  <React.Fragment>
                    <div className="grid-66">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            placeholder="Course title..."
                            value={title}
                            onChange={this.change}
                          />
                        </div>
                        <p>{`By ${firstName} ${lastName}`}</p>
                      </div>
                      <div>
                        <div>
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Course description..."
                            value={description}
                            onChange={this.change}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid-25 grid-right">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                placeholder="Hours"
                                value={estimatedTime}
                                onChange={this.change}
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                placeholder="List materials..."
                                value={materialsNeeded}
                                onChange={this.change}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const {
      id,
      title,
      firstName,
      lastName,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    const course = {
      id,
      title,
      firstName,
      lastName,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    const { authenticatedUser } = context;

    context.data
      .updateCourse(
        course,
        authenticatedUser.username,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.length) {
          console.warn(errors);
          //If any errors were returned, update component error state
          this.setState({ errors: errors });
        } else {
          context.actions
            .signIn(authenticatedUser.username, authenticatedUser.password)
            .then(() => {
              this.props.history.push(`/courses/${course.id}`);
            })
            .catch(err => {
              this.props.history.push("/forbidden");
            });
        }
      })
      .catch(errors => {
        console.error(errors);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  };
}
