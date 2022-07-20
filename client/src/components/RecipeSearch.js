import React, { useContext, useState } from "react";
import ReactContext from "../context/react.context";
// import Slider from "@material-ui/core/Slider";
// import { calories, setCalories } from "./RangeSlider";

const RecipeSearch = (props) => {
  const reactCtx = useContext(ReactContext);

  const handleMeatInput = (event) => {
    console.log(`${event.target.value} clicked`);
    reactCtx.setMeatInput(event.target.value);
  };

  const handleVegInput = (event) => {
    console.log(`${event.target.value} clicked`);
    reactCtx.setVegInput(event.target.value);
  };

  const handleTagsInput = (event) => {
    console.log(`${event.target.value} clicked`);
    reactCtx.setTagsInput(event.target.value);
  };

  // const handleChange = (event, newCalories) => {
  //   setCalories(newCalories);
  // };

  // function valuetext(value) {
  //   return `${value}°C`;
  // }

  return (
    <div id="recipe-search">
      <div className="form">
        <form onSubmit={props.handleSearch}>
          {/* ==================== MEAT/PROTEIN ==================== */}
          <div className="search-category" onChange={handleMeatInput}>
            <h4>Protein</h4>
            <input type="radio" value="chicken" name="meat" />
            &nbsp;Chicken <br />
            <input type="radio" value="beef" name="meat" />
            &nbsp;Beef <br />
            <input type="radio" value="pork" name="meat" />
            &nbsp;Pork <br />
            <input type="radio" value="impossible meat" name="meat" />
            &nbsp;Impossible Meat <br />
          </div>
          {/* ==================== VEG ==================== */}
          <div className="search-category" onChange={handleVegInput}>
            <h4>Veg</h4>
            <input type="radio" value="lettuce" name="veg" />
            &nbsp;Lettuce <br />
            <input type="radio" value="tomato" name="veg" />
            &nbsp;Tomato <br />
            <input type="radio" value="cabbage" name="veg" />
            &nbsp;Cabbage <br />
            <input type="radio" value="baby spinach" name="veg" />
            &nbsp;Baby Spinach <br />
          </div>
          {/* ==================== TAGS ==================== */}
          <div className="search-category" onChange={handleTagsInput}>
            <h4>Tags</h4>
            <input type="radio" value="healthy" name="tags" />
            &nbsp;Healthy <br />
            <input type="radio" value="quick" name="tags" />
            &nbsp;Quick <br />
            <input type="radio" value="easy" name="tags" />
            &nbsp;Easy <br />
            <input type="radio" value="refreshing" name="tags" />
            &nbsp;Refreshing <br />
          </div>
          <button type="submit">Search</button>
          <div className="link">
            Tired of making decisions?&nbsp;
            <span onClick={props.handleViewAll}>View all recipes.</span>
          </div>
        </form>
        {/* ==================== SLIDER - CALORIES ==================== */}
        {/* <h4>Calories</h4>
      <input
        type="range"
        min="1"
        max="100"
        // value={value}
        // onChange={handleSliderChange}
      />
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={calories}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      /> */}
        {/* ==================== SLIDER - PREP TIME ==================== */}
        {/* testing states  */}
        {/* Meat input: {reactCtx.meatInput}
      <br />
      Veg input: {reactCtx.vegInput}
      <br />
      Tags input: {reactCtx.tagsInput}
      <br /> */}
      </div>
    </div>
  );
};

export default RecipeSearch;
