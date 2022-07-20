import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import ReactDOM from "react-dom";

const OverLay = (props) => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setName(formValues.username);
    setPassword(formValues.password);
    setEmail(formValues.email);
  };

  const handleSendRegister = (e) => {
    e.preventDefault();

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/users/create";

      // fetch config
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password1: password,
          isAdmin: true,
        }),
      };

      console.log(name);
      console.log("fetch starts");
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
      if (name !== "" && password !== "" && email !== "") {
        alert("Your account has been registered");
      } else {
        alert("Please fill in all the inputs and then click the Submit button");
      }
    };

    getData();

    console.log("registered");
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 12) {
      errors.password = "Password must be more than 12 characters";
    }
    return errors;
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h2> Register </h2>
        </header>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="ui divider"></div>
            <div className="ui form">
              <div className="field row">
                <div className="col-sm-3">
                  <label>Username</label>
                </div>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formValues.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.username}</p>
              <div className="field row">
                <div className="col-sm-3">
                  <label>Email</label>
                </div>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.email}</p>
              <div className="field row">
                <div className="col-sm-3">
                  <label>Password</label>
                </div>
                <div className="col-sm-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <p>{formErrors.password}</p>
              <button>Submit</button>
            </div>
          </form>
          <button className="fluid ui button blue" onClick={handleSendRegister}>
            Register
          </button>
          <button className="fluid ui button blue" onClick={props.okayClicked}>
            Back to Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

const RegisterModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay okayClicked={props.okayClicked} />,
        document.querySelector("#registerModal-root")
      )}
    </>
  );
};

export default RegisterModal;
