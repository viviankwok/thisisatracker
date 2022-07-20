import React, { useCallback, useContext } from "react";
import ReactContext from "../context/react.context";

const RecipeResults = (props) => {
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
        <div id="recipe-name">{d.name}</div>
        <br />
        <div>
          <strong>main ingredients:</strong>
        </div>
        <div className="capitalise">
          {d.meat}, {d.veg}
        </div>
        <br />
        <span id="bold">{d.calories}</span> calories
        <br />
        <span id="bold">{d.prepTime}</span> minutes
        <br />
        {d.instructions}
        <br />
        <br />
        <button onClick={() => props.handleUpdate(d._id)}>Update</button> &nbsp;
        <button onClick={() => props.handleDelete(d._id)}>Delete</button>
      </div>
    );
  });

  return <div id="recipe-results">{display}</div>;
};

export default RecipeResults;
