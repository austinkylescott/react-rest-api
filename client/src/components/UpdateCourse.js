import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UpdateCourse extends Component {
  state = {
    id: this.props.match.params.id
  };

  componentDidMount() {
    const { context } = this.props;

    context.data.getCourse(this.state.id).then(course => {
      this.setState(course);
    });
    console.log(this.state);
  }

  render() {
    return <div></div>;
  }
}
