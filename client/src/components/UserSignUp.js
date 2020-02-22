import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: []
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div className="bounds">
        <hr />
        <div className="grid-33 centered signout">
          <h1>Sign Up</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={this.change}
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={this.change}
                  />
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    placeholder="Email Address"
                    value={emailAddress}
                    onChange={this.change}
                  />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.change}
                  />
                </React.Fragment>
              )}
            />
            <p>&nbsp;</p>
            <p>
              Already have a user account? <Link to="/signin">Click here</Link>{" "}
              to sign in!
            </p>
          </div>
        </div>
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      console.log(`${name} ${value}`);
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;

    //New User Payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data
      .createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(
            `${emailAddress} is successfully signed up and authenticated.`
          );
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/");
          });
        }
      })
      .catch(err => {
        //Handles any rejected promises
        console.log(err);
        this.props.history.push("/error"); //push error page to history stack
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
