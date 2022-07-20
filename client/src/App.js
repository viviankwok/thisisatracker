import React, { useState, useContext, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Recipes from "./components/Recipes";
import CalorieTracker from "./components/CalorieTracker";
import LoginForm from "./components/LoginForm";
import ReactContext from "./context/react.context";
import View from "./components/View";

function App() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const initialState = localStorage.getItem("loginAccess")
    ? localStorage.getItem("loginAccess")
    : "";

  const [loginData, setLoginData] = useState(initialState);

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

  /////////////////////////////////////////////
  // Local Storage
  /////////////////////////////////////////////
  useEffect(() => {
    localStorage.setItem("loginAccess", loginData);
  }, [loginData]);

  ////////////////////////////////////////////
  // Logout
  ////////////////////////////////////////////
  const logout = () => localStorage.setItem("loginAccess", "");

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
    <div>
      <div className="headerTitle">
        <h2>Recipe Tracker</h2>
      </div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Login" />} />
          {/* <Route path="/Main" element={<Main />} /> */}
          <Route
            path="/Login"
            element={
              <ReactContext.Provider
                value={{
                  loginData,
                  emailInput,
                  passwordInput,
                  handleLoginSubmit,
                  handleEmailInput,
                  handlePasswordInput,
                  logout,
                }}
              >
                <LoginForm /> <View />
              </ReactContext.Provider>
            }
          />

          {/* Protect these routes with RequireLogin */}
          {/* <Route element={<RequireLogin />}> */}
          <Route
            path="/Recipes"
            element={
              <ReactContext.Provider value={{ loginData }}>
                <Recipes />
              </ReactContext.Provider>
            }
          />
          <Route path="/CalorieTracker" element={<CalorieTracker />} />
          {/* </Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
