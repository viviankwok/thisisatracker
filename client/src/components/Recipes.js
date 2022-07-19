import React, { useState, useEffect } from "react";
import RecipeSearch from "./RecipeSearch";
import ReactContext from "../context/react.context";
import RecipeResults from "./RecipeResults";

const Recipes = () => {
  // radio buttons states
  const [meatInput, setMeatInput] = useState([]);
  const [vegInput, setVegInput] = useState("testing veg");
  const [tagsInput, setTagsInput] = useState("testing tags");
  // sliders states
  const [caloriesInput, setCaloriesInput] = useState("");
  const [prepTimeInput, setPrepTimeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeData, setRecipeData] = useState([]);

  // handle criteria search - meat, veg, tags input only
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("handleSearchSubmit in recipes component activated");
    console.log("typeof meatInput :", typeof meatInput);

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/filter";

      // fetch config
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meatTags: [meatInput],
          vegTags: [vegInput],
          tags: [tagsInput],
        }),
      };

      // actual fetching
      console.log("fetch starts");
      const response = await fetch(url, config);
      console.log("fetch ends");

      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
      setRecipeData(data);
    };

    getData();
  };

  // const handleCaloriesInput = (event) => {
  //   setMeatInput(event.target.value);
  // };

  // const handlePrepInput = (event) => {
  //   setMeatInput(event.target.value);
  // };

  return (
    <>
      <ReactContext.Provider
        value={{
          meatInput,
          setMeatInput,
          vegInput,
          setVegInput,
          tagsInput,
          setTagsInput,
          caloriesInput,
          setCaloriesInput,
          prepTimeInput,
          setPrepTimeInput,
        }}
      >
        <h1>Recipes component</h1>
        <RecipeSearch handleSearch={handleSearch} />
        <RecipeResults recipeData={recipeData} />
      </ReactContext.Provider>
    </>
  );
};

export default Recipes;
