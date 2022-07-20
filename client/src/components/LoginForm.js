import React, { useState, useContext } from "react";
import ReactContext from "../context/react.context";
import View from "./View";
const LoginForm = (props) => {
  const reactCtx = useContext(ReactContext);
  return (
    <>
      <h1 className="centered">Login</h1>
      <div className="centered">
        <form onSubmit={reactCtx.handleLoginSubmit}>
          <label>Enter Your Email: </label>
          <input
            name="email"
            value={reactCtx.emailInput}
            onChange={reactCtx.handleEmailInput}
            type="text"
            placeholder="Enter Email Here"
          />
          <br />
          <br />
          <div>
            <label>Enter Password: </label>
            <input
              name="password"
              value={reactCtx.passwordInput}
              onChange={reactCtx.handlePasswordInput}
              type="password"
              placeholder="Enter Password Here"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <button id="button" onClick={reactCtx.logout}>
        Logout
      </button>
      ;
    </>
  );
};

export default LoginForm;
