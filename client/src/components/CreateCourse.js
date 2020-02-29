import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: "",
    firstName: "",
    lastName: "",
    errors: []
  };

  componentDidMount() {
    const { context } = this.props;
    const { authenticatedUser } = context;

    context.data
      .getUser(authenticatedUser.username, authenticatedUser.password)
      .then(user => {
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.userId
        });
      })
      .catch(err => this.props.history.push("/error"));
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      firstName,
      lastName,
      errors
    } = this.state;

    return (
      <div>
        <hr />
        <div>
          <h1>Create Course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
    );
  }

  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    const { authenticatedUser } = context;
    context.data
      .createCourse(
        course,
        authenticatedUser.username,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.error) {
          //If any errors were returned, update component error state
          this.setState({ errors: errors.error });
        } else {
          //Clear any pre-existing errors from previous attempt
          this.setState({ errors: [] });
          context.actions
            .signIn(authenticatedUser.username, authenticatedUser.password)
            .then(() => {
              this.props.history.push(`/`);
            })
            .catch(err => {
              this.props.history.push("/forbidden");
            });
        }
      })
      .catch(errors => {
        this.props.history.push("/error");
      });
  };

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  cancel = () => {
    this.props.history.push(`/`);
  };
}
