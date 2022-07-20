import React, { useContext, useState } from "react";
import ReactContext from "../context/react.context";

const View = () => {
  const reactCtx = useContext(ReactContext);
  const [isLoading, setIsLoading] = useState(false);
  const [viewData, setViewData] = useState({});

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
    // setError(null);

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

    // try {
    const res = await fetch(url, config);
    // if (res.status !== 200) {
    //   throw new Error(
    //     "Something went wrong. Please check if all inputs fields are clicked"
    //   );
    // }

    const data = await res.json();
    setViewData(data);
    // } catch (err) {
    //   setError(err.message);
    // }
    setIsLoading(false);
  };
  console.log(viewData);
  const viewTheData = JSON.stringify(viewData);
  return (
    <>
      {accessToken}
      <div>
        <button onClick={handleViewSubmit}>View all</button>
        {viewTheData}
      </div>
    </>
  );
};

export default View;
