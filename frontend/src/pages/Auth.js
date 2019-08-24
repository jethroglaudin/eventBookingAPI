import React, { Component } from "react";

import './Auth.css';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = () => {

    };
  render() {
    return (
       <form className="auth-form">
        <div className="form-control">
        <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref= { this.emailEl } />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref= { this.passwordEl } />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button"> Switch to Signup
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
