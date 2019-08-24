import React, { Component } from "react";

import './Auth.css';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = () => {
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            // either not email or no passord then we just return and do not continue
            return;
        }
        


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
