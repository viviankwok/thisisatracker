import React, { useState, useContext } from "react";
import ReactContext from "../context/react.context";
import View from "./View";
const LoginForm = (props) => {
  const reactCtx = useContext(ReactContext);

  let content = "";
  console.log(reactCtx.loginData);
  if (reactCtx.loginData) {
    content = (
      <div>
        <h3>Login Successful</h3>
      </div>
    );
  }
  if (reactCtx.error) {
    content = <p>{reactCtx.error}</p>;
  }

  if (reactCtx.isLoading) {
    content = <p>Logging in .. please wait</p>;
  }
  return (
    <>
      <div className="centered loginForm">
        <div className="centered">
          <h1>Login</h1>
        </div>
        <form onSubmit={reactCtx.handleLoginSubmit}>
          <div className="row">
            <div className="col-sm-5">
              <label>Enter Your Email: </label>
            </div>
            <div className="col-sm-7">
              <input
                name="email"
                value={reactCtx.emailInput}
                onChange={reactCtx.handleEmailInput}
                type="text"
                placeholder="Enter Email Here"
              />
            </div>
          </div>

          <p>{reactCtx.loginInvalid.email}</p>

          <div className="row">
            <div className="col-sm-5">
              <label>Enter Password: </label>
            </div>
            <div className="col-sm-7">
              <input
                name="password"
                value={reactCtx.passwordInput}
                onChange={reactCtx.handlePasswordInput}
                type="password"
                placeholder="Enter Password Here"
              />
            </div>
          </div>
          <p>{reactCtx.loginInvalid.password}</p>
          <button className="button" type="submit">
            Submit
          </button>

          <button className="button" onClick={reactCtx.handleRegisterSubmit}>
            Register
          </button>
        </form>
      </div>
      <div className="errorLogin">
        <h4>{content}</h4>
      </div>
    </>
  );
};

export default LoginForm;
