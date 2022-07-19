import React, { useState, useContext } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState("");

  const fetchLogin = async (emailInput, passwordInput) => {
    setIsLoading(true);
    setError(null);

    const url = "http://localhost:5001/users/login";
    const config = {
      method: "POST",
      headers: {
        authorization: "Bearer TOKEN",
      },
      // body: {email: req.body.email, password: req.body.password},
      body: { email: emailInput, password: passwordInput },
    };

    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error(
          "Something went wrong. Please check if all inputs fields are clicked"
        );
      }

      const data = await res.json();
      setLoginData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  ////////////////////////////////////////////
  // Submit Function
  ////////////////////////////////////////////
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    // const url = "http://localhost:5001/users/login";
    fetchLogin(emailInput, passwordInput);
  };

  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
  };

  let content = "";
  if (loginData) {
    content = (
      <div>
        <h3>Login Successful</h3>
      </div>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Logging in .. please wait</p>;
  }
  return (
    <>
      <LoginForm
        emailInput={emailInput}
        passwordInput={passwordInput}
        handleLoginSubmit={handleLoginSubmit}
        handleEmailInput={handleEmailInput}
        handlePasswordInput={handlePasswordInput}
      />
      {content}
    </>
  );
};
export default Login;
