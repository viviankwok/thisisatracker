import React from "react";

const RecipeResults = (props) => {
  //added
  let content = "";
  if (props.recipeData) {
    content = props.recipeData.map((d, i) => {
      return (
        <div id="recipe-results">
          Recipes component Name: {d.name}
          <br />
          <div fontSize="100">{d.calories}</div> calories
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
  }
  if (props.error) {
    content = <p>{props.error}</p>;
  }

  if (props.isLoading) {
    content = <p>The recipe results are loading.. please wait</p>;
  }

  // End of Added

  console.log(props.recipeData);
  const display = props.recipeData.map((d, i) => {
    console.log(d);
    return (
      <div id="recipe-results">
        Recipes component Name: {d.name}
        <br />
        <div fontSize="100">{d.calories}</div> calories
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

  return <div>{display}</div>;
};

export default RecipeResults;

// INDEX CSS
// :root {
//   --mustard: #fae6b1;
//   --orange: #ffa101;
//   --lightBlue: #b3dee5;
//   --darkBlue: #31525b;
// }

// #recipe-search {
//   background-color: var(--mustard);
// }

// #recipe-results {
//   background-color: var(--orange);
//   height: 300px;
//   width: 250px;
//   border-radius: 10px;
//   padding: 10px;
// }

// #recipes {
//   /* background-color: red; */
//   display: inline;
// }

// #navbar {
//   background-color: var(--darkBlue);
// }

// IN RECIPES

// const recipe = [
//   {
//     name: "avocado sandwhich",
//     meat: ["impossible meat"],
//     veg: ["lettuce", "cucumber", "tomatoes"],
//     calories: 450,
//     instructions: "Take avocado and sandwhich it.",
//     prepTime: 5,
//     tags: ["healthy", "delicious", "easy", "avocado", "lovely", "hahaha"],
//   },
//   {
//     name: "banana sandwhich",
//     meat: ["chicken"],
//     veg: ["lettuce", "olives", "cabbage"],
//     calories: 450,
//     instructions: "Take banana and sandwhich it.",
//     prepTime: 5,
//     tags: ["healthy", "yellow outside", "white inside", "peel", "hahaha"],
//   },
//   {
//     name: "coconut paprika chicken",
//     meat: ["chicken"],
//     veg: ["baby spinach"],
//     calories: 450,
//     instructions: "Add coconut and paprika to chicken",
//     prepTime: 25,
//     tags: ["healthy", "orange", "beautiful", "tasty", "coconut"],
//   },
// ];
