import React, { useContext, useState } from "react";
import ReactContext from "../context/react.context";

const View = () => {
  const reactCtx = useContext(ReactContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewData, setViewData] = useState([]);

  const handleViewSubmit = (event) => {
    event.preventDefault();

    fetchViewUsers();
  };

  // Working
  const accessToken = reactCtx.loginData;

  //   const access_token = setAccessToken(reactCtx.loginData);

  // const storedLogin = localStorage.getItem("loginData");
  // const [accessToken, setAccessToken] = useState(storedLogin);

  console.log(accessToken);
  const fetchViewUsers = async () => {
    setIsLoading(true);
    setError(null);

    const url = "http://localhost:5001/users/users";
    console.log("This is url");
    console.log(url);

    const config = {
      method: "GET",
      headers: {
        authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      // body: {email: req.body.email, password: req.body.password},
      //   body: JSON.stringify({}),
    };

    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error("Unable to retrieve user data.");
      }

      const data = await res.json();
      setViewData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  let content = "";
  console.log(viewData);
  // const viewTheData = JSON.stringify(viewData);
  if (viewData) {
    // content = <div>{viewTheData}</div>;
    content = viewData.map((item) => {
      return (
        <>
          <div className="center">name: {item.name}</div>
          <div className="center">email: {item.email}</div>
        </>
      );
    });
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Logging in .. please wait</p>;
  }
  console.log(viewData);

  return (
    <>
      <div className="viewAllUsers">
        <button onClick={handleViewSubmit}>View all</button>
        {content}
      </div>
    </>
  );
};

export default View;
