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
  const [instructionsForm, setInstructionsForm] = useState("");
  const [prepTimeForm, setPrepTimeForm] = useState(0);
  const [idForm, setIdForm] = useState("");
  // access token
  const reactCtx = useContext(ReactContext);
  const accessToken = reactCtx.loginData;
  // error content
  const [content, setContent] = useState("");

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
      try {
        const response = await fetch(url, config);
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }

        const data = await response.json();
        console.log("data fetched from backend: ", JSON.stringify(data));
        setRecipeData(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getData();

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }

    if (recipeData.length === 0) {
      setContent("No recipes found. Please try again.");
    }
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
          authorization: "Bearer " + accessToken,
        },
      };

      // actual fetching
      try {
        const response = await fetch(url, config);
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }
        const data = await response.json();
        console.log("data fetched from backend: ", JSON.stringify(data));
        setRecipeData(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getData();

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }

    if (recipeData.length === 0) {
      setContent("No recipes found. Please try again.");
    }
  };

  const handleUpdate = (id) => {
    // step 1/2: populates form with pre-existing fields
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
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      // actual fetching
      try {
        const response = await fetch(url, config);
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }
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
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getData();

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }

    if (recipeData.length === 0) {
      setContent("Recipe not found. Please try again.");
    }
  };

  const handleEditSubmit = (id) => {
    // step 2/2: sends edited fields to db for updating

    console.log(`submit edit btn clicked for ${id}`);

    // update recipe db with current state
    const updateData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/edit";

      // fetch config
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
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
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        console.log("data fetched from backend: ", JSON.stringify(data));
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    updateData();
    setShowEdit(false);

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    } else {
      alert("Successfully updated!");
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }

    // reset form fields to empty
    setIdForm("");
    setNameForm("");
    setMeatForm("");
    setVegForm("");
    setTagsForm("");
    setCaloriesForm(0);
    setInstructionsForm("");
    setPrepTimeForm(0);
  };

  const handleDelete = (id) => {
    console.log("delete btn clicked in parent: Recipe.js");
    console.log(id);

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/delete";

      // fetch config
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({
          id: id,
        }),
      };

      // actual fetching
      try {
        const response = await fetch(url, config);
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }
        const data = await response.json();
        console.log("data fetched from backend: ", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getData();

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    } else {
      alert("Successfully deleted!");
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }
  };

  const handleCreate = (event) => {
    // opens create recipe modal
    console.log("handleCreate / create new recipe clicked");
    setShowCreate(true);
  };

  const handleClose = (event) => {
    // close modal
    event.preventDefault();
    console.log("close clicked");
    setShowCreate(false);
    setShowEdit(false);

    // reset form fields to empty
    setIdForm("");
    setNameForm("");
    setMeatForm("");
    setVegForm("");
    setTagsForm("");
    setCaloriesForm(0);
    setInstructionsForm("");
    setPrepTimeForm(0);
  };

  const handleModalOkay = (event) => {
    // sends info to db to create recipe
    event.preventDefault();
    console.log("handleModalOkay clicked");

    const getData = async () => {
      // endpoint URL
      const url = "http://localhost:5001/recipes/create";

      // fetch config
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
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
      try {
        const response = await fetch(url, config);
        if (response.status !== 200) {
          throw new Error("Unable to retrieve user data.");
        }
        const data = await response.json();
        console.log("data fetched from backend: ", JSON.stringify(data));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    getData();

    if (error) {
      setContent(
        "Something went wrong. Might not be your fault, please try again."
      );
    } else {
      alert("Successfully created!");
    }

    if (isLoading) {
      setContent("Working hard... Please wait.");
    }

    // reset all fields to empty
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
    <div id="recipes-main-div container-fluid">
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

        {error || isLoading || recipeData.length === 0 ? (
          content
        ) : (
          <RecipeResults
            recipeData={recipeData}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}

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
