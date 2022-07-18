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

  const handleSearchSubmit = () => {};

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
      <ReactContext.Provider>
        value=
        {{
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
      </ReactContext.Provider>
    </>
  );
};

export default Recipes;
