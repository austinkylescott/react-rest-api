import React, { Component } from "react";

export default class Forbidden extends Component {
  render() {
    return (
      <div>
        <hr />
        <div className="bounds">
          <h1>Forbidden</h1>
          <p>Oh no! You can't access this page.</p>
        </div>
      </div>
    );
  }
}
