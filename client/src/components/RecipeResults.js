import React, { useCallback, useContext } from "react";
import ReactContext from "../context/react.context";

const RecipeResults = (props) => {
  // //added
  // let content = "";
  // if (props.recipeData) {
  //   content = props.recipeData.map((d, i) => {
  //     return (
  //       <div id="recipe-results">
  //         Recipes component Name: {d.name}
  //         <br />
  //         <div fontSize="100">{d.calories}</div> calories
  //         <br />
  //         {d.prepTime} minutes
  //         <br />
  //         {d.instructions}
  //         <br />
  //         Main ingredients:
  //         {d.meat}, {d.veg}
  //         <br />
  //         {d.name}
  //       </div>
  //     );
  //   });
  // }
  // if (props.error) {
  //   content = <p>{props.error}</p>;
  // }

  // if (props.isLoading) {
  //   content = <p>The recipe results are loading.. please wait</p>;
  // }

  // // End of Added

  // console.log(props.recipeData);
  const reactCtx = useContext(ReactContext);
  if (props.recipeData.length !== 0) {
    reactCtx.setEmptyDisplay(false);
  } else {
    reactCtx.setEmptyDisplay(true);
  }

  const display = props.recipeData.map((d, i) => {
    // console.log(d);
    return (
      <div id="recipe-card">
        Recipes component Name: {d.name}
        <br />
        <div>{d.calories}</div> calories
        <br />
        {d.prepTime} minutes
        <br />
        {d.instructions}
        <br />
        Main ingredients:
        {d.meat}, {d.veg}
        <br />
        {d.name}
        <br /> <button onClick={() => props.handleUpdate(d._id)}>Update</button>
        <button onClick={() => props.handleDelete(d._id)}>Delete</button>
      </div>
    );
  });

  return <div id="recipe-results">{display}</div>;
};

export default RecipeResults;
