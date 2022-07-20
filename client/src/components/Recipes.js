import React, { useState, useEffect, useContext } from "react";
import RecipeSearch from "./RecipeSearch";
import ReactContext from "../context/react.context";
import RecipeResults from "./RecipeResults";
import CreateRecipeModal from "./CreateRecipeModal";
import EditRecipeModal from "./EditRecipeModal";

const Recipes = () => {
  // radio buttons states
  const [meatInput, setMeatInput] = useState([]);
  const [vegInput, setVegInput] = useState("testing veg");
  const [tagsInput, setTagsInput] = useState("testing tags");
  // sliders states
  const [caloriesInput, setCaloriesInput] = useState("");
  const [prepTimeInput, setPrepTimeInput] = useState("");
  // loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // display data / recipe cards
  const [recipeData, setRecipeData] = useState([]);
  const [emptyDisplay, setEmptyDisplay] = useState(true);
  // modals
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // form fields
  const [nameForm, setNameForm] = useState("");
  const [meatForm, setMeatForm] = useState("");
  const [vegForm, setVegForm] = useState("");
  const [tagsForm, setTagsForm] = useState("");
  const [caloriesForm, setCaloriesForm] = useState(0);
  const [instructionsForm, setInstructionsForm] = useState(0);
  const [prepTimeForm, setPrepTimeForm] = useState(0);
  const [idForm, setIdForm] = useState("");
  // access token
  const reactCtx = useContext(ReactContext);
  const accessToken = reactCtx.loginData;

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
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          meatTags: [meatInput],
          vegTags: [vegInput],
          tags: [tagsInput],
        }),
      };

      // actual fetching
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
      setRecipeData(data);
    };

    getData();
  };

  const handleViewAll = (event) => {
    event.preventDefault();
    console.log("view all btn clicked, in parent: Recipes.js");

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/recipes";

      // fetch config
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // actual fetching
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
      setRecipeData(data);
    };

    getData();
  };

  const handleUpdate = (id) => {
    console.log(`update btn clicked for ${id}`);
    setShowEdit(true);

    // get existing recipe to populate state
    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/recipe";

      // fetch config
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      // actual fetching
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));

      setIdForm(data._id);
      setNameForm(data.name);
      setMeatForm(data.meat);
      setVegForm(data.veg);
      setTagsForm(data.tags);
      setCaloriesForm(data.calories);
      setInstructionsForm(data.instructions);
      setPrepTimeForm(data.prepTime);
    };

    getData();
  };

  const handleEditSubmit = (id) => {
    console.log(`submit edit btn clicked for ${id}`);

    // update recipe db with current state
    const updateData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/edit2";

      // fetch config
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: nameForm,
          meat: meatForm,
          veg: vegForm,
          tags: tagsForm,
          calories: caloriesForm,
          instructions: instructionsForm,
          prepTime: prepTimeForm,
        }),
      };

      // actual fetching
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
    };
    updateData();
    setShowEdit(false);
  };

  const handleDelete = (id) => {
    // event.preventDefault();

    console.log("delete btn clicked in parent: Recipe.js");
    console.log(id);

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/delete2";

      // fetch config
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      // actual fetching
      const response = await fetch(url, config);
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
      alert("Recipe deleted.");
    };

    getData();
  };

  const handleCreate = (event) => {
    console.log("handleCreate / create new recipe clicked");
    setShowCreate(true);
  };

  const handleClose = (event) => {
    event.preventDefault();
    console.log("close clicked");
    setShowCreate(false);
    setShowEdit(false);
  };

  const handleModalOkay = (event) => {
    event.preventDefault();
    console.log("handleModalOkay clicked");

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/create2";

      // fetch config
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameForm,
          meat: meatForm,
          veg: vegForm,
          tags: tagsForm,
          calories: caloriesForm,
          instructions: instructionsForm,
          prepTime: prepTimeForm,
        }),
      };

      // actual fetching
      console.log("fetch starts");
      const response = await fetch(url, config);
      console.log("fetch ends");
      const data = await response.json();
      console.log("data fetched from backend: ", JSON.stringify(data));
    };

    getData();

    alert("Ok! Recipe created.");
    setShowCreate(false);
    setMeatForm("");
    setVegForm("");
    setTagsForm("");
    setCaloriesForm("");
    setInstructionsForm("");
    setPrepTimeForm("");
  };

  // const handleCaloriesInput = (event) => {
  //   setMeatInput(event.target.value);
  // };

  // const handlePrepInput = (event) => {
  //   setMeatInput(event.target.value);
  // };

  return (
    <div id="recipes-main-div">
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
          emptyDisplay,
          setEmptyDisplay,
          meatForm,
          setMeatForm,
          vegForm,
          setVegForm,
          tagsForm,
          setTagsForm,
          nameForm,
          setNameForm,
          caloriesForm,
          setCaloriesForm,
          instructionsForm,
          setInstructionsForm,
          prepTimeForm,
          setPrepTimeForm,
          idForm,
          setIdForm,
        }}
      >
        {showCreate ? (
          <CreateRecipeModal
            title="Create New Recipe"
            closeClicked={handleClose}
            okayClicked={handleModalOkay}
          ></CreateRecipeModal>
        ) : (
          ""
        )}

        {showEdit ? (
          <EditRecipeModal
            title="Edit New Recipe"
            closeClicked={handleClose}
            handleEditSubmit={handleEditSubmit}
          ></EditRecipeModal>
        ) : (
          ""
        )}

        <RecipeSearch
          handleSearch={handleSearch}
          handleViewAll={handleViewAll}
        />
        <RecipeResults
          recipeData={recipeData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
        <div className="link">
          {emptyDisplay ? (
            ""
          ) : (
            <div>
              Nothing suits your taste?&nbsp;
              <span onClick={handleCreate}>Create new recipe.</span>
            </div>
          )}
        </div>
      </ReactContext.Provider>
    </div>
  );
};

export default Recipes;
