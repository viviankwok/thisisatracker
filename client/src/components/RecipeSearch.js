import React from "react";

const RecipeSearch = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit btn clicked");
  };

  return (
    <div id="recipe-search">
      RecipeSearch component
      <br />
      <form onSubmit={handleSubmit}>
        <div className="search-category">
          <h2>Protein</h2>
          <input type="radio" value="chicken" name="meat" />
          Chicken <br />
          <input type="radio" value="chicken" name="meat" />
          Beef <br />
          <input type="radio" value="chicken" name="meat" />
          Mutton <br />
          <input type="radio" value="chicken" name="meat" />
          Pork <br />
        </div>
        <div className="search-category">
          <h2>Veg</h2>
          <input type="radio" value="Lettuce" name="veg" />
          Lettuce <br />
          <input type="radio" value="Tomato" name="veg" />
          Tomato <br />
          <input type="radio" value="Cabbage" name="veg" />
          Cabbage <br />
          <input type="radio" value="Baby Spinach" name="veg" />
          Baby Spinach <br />
        </div>
        <div className="search-category">
          <h2>Tags</h2>
          <input type="radio" value="healthy" name="tags" />
          Healthy <br />
          <input type="radio" value="quick" name="tags" />
          Quick <br />
          <input type="radio" value="easy" name="tags" />
          Easy <br />
          <input type="radio" value="heavenly" name="tags" />
          Heavenly <br />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipeSearch;
