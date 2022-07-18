import React, { useState, useEffect } from "react";
import RecipeSearch from "./RecipeSearch";
import RecipeResults from "./RecipeResults";
import ReactContext from "../context/react.context";
const Recipes = () => {
  const [meatInput, setMeatInput] = useState("");
  const [vegInput, setVegInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [prepTimeInput, setPrepTimeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipeData, setRecipeData] = useState("");

  const fetchRecipes = async (url) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error(
          "Something went wrong. Please check if all inputs fields are clicked"
        );
      }

      const data = await res.json();
      setRecipeData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:5001/recipes/filter";
    fetchRecipes(url);
  };

  const handleMeatInput = (event) => {
    setMeatInput(event.target.value);
  };

  const handleVegInput = (event) => {
    setMeatInput(event.target.value);
  };

  const handleTagsInput = (event) => {
    setMeatInput(event.target.value);
  };

  const handleCaloriesInput = (event) => {
    setMeatInput(event.target.value);
  };

  const handlePrepInput = (event) => {
    setMeatInput(event.target.value);
  };
  return (
    <>
      <h1>text</h1>
      {/* <ReactContext.Provider
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
          handleSearchSubmit,
          handleMeatInput,
          handleVegInput,
          handleTagsInput,
          handleCaloriesInput,
          handlePrepInput,
        }}
      >
        <RecipeSearch />
        <RecipeResults />
      </ReactContext.Provider> */}
    </>
  );
};

export default Recipes;
