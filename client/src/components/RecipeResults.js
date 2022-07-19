import React from "react";

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

  console.log(props.recipeData);
  const display = props.recipeData.map((d, i) => {
    console.log(d);
    return (
      <div id="recipe-results">
        Recipes component Name: {d.name}
        <br />
        <div fontSize="100px">{d.calories}</div> calories
        <br />
        {d.prepTime} minutes
        <br />
        {d.instructions}
        <br />
        Main ingredients:
        {d.meat}, {d.veg}
        <br />
        {d.name}
      </div>
    );
  });

  return <div className="all-results">{display}</div>;
};

export default RecipeResults;
