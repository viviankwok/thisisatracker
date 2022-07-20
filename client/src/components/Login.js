import React, { useState, useContext } from "react";
import LoginForm from "./LoginForm";
import ReactContext from "../context/react.context";
import View from "./View";
import RegisterModal from "./RegisterModal";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState("");

  const fetchLogin = async () => {
    setIsLoading(true);
    // setError(null);

    const url = "http://localhost:5001/users/login";
    console.log("This is url");
    console.log(url);

    const config = {
      method: "POST",
      headers: {
        // authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
      },
      // body: {email: req.body.email, password: req.body.password},
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    };

    // try {
    const res = await fetch(url, config);
    // if (res.status !== 200) {
    //   throw new Error(
    //     "Something went wrong. Please check if all inputs fields are clicked"
    //   );
    // }

    const data = await res.json();
    setLoginData(data.access);
    // } catch (err) {
    //   setError(err.message);
    // }
    setIsLoading(false);
  };

  console.log("this is data");
  console.log(loginData);

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

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setOpenRegisterModal(true);
  };

  const handleModalOkay = () => {
    setOpenRegisterModal(false);
  };

  let content = "";
  console.log(loginData);
  if (loginData) {
    content = (
      <div>
        <h3>Login Successful</h3>
      </div>
    );
  }
  // if (error) {
  //   content = <p>{error}</p>;
  // }

  if (isLoading) {
    content = <p>Logging in .. please wait</p>;
  }

  return (
    <>
      {openRegisterModal && <RegisterModal okayClicked={handleModalOkay} />}
      ;
      <LoginForm
        emailInput={emailInput}
        passwordInput={passwordInput}
        handleLoginSubmit={handleLoginSubmit}
        handleEmailInput={handleEmailInput}
        handlePasswordInput={handlePasswordInput}
        handleRegisterSubmit={handleRegisterSubmit}
      />
      <ReactContext.Provider value={{ loginData }}>
        <View />
      </ReactContext.Provider>
      {content}
    </>
  );
};
export default Login;
