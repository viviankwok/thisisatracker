import React, { useState, useContext } from "react";

const LoginForm = (props) => {
  return (
    <>
      <h1 className="centered">Login</h1>
      <div className="centered">
        <form onSubmit={props.handleLoginSubmit}>
          <label>Enter Your Email: </label>
          <input
            name="email"
            value={props.emailInput}
            onChange={props.handleEmailInput}
            type="text"
            placeholder="Enter Email Here"
          />
          <br />
          <br />
          <div>
            <label>Enter Password: </label>
            <input
              name="password"
              value={props.passwordInput}
              onChange={props.handlePasswordInput}
              type="password"
              placeholder="Enter Password Here"
            />
          </div>
          <button type="submit">Submit</button>
          <button onClick={props.handleRegisterSubmit}>Register</button>
        </form>
      </div>
      ;
    </>
  );
};

export default LoginForm;
