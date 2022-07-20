import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./CreateRecipeModal.module.css";
import ReactContext from "../context/react.context";

const OverLay = (props) => {
  const reactCtx = useContext(ReactContext);

  const handleNameChange = (event) => {
    reactCtx.setNameForm(event.target.value);
  };

  const handleMeatForm = (event) => {
    console.log(`${event.target.value} selected in meatForm`);
    reactCtx.setMeatForm(event.target.value);
  };

  const handleVegForm = (event) => {
    console.log(`${event.target.value} selected in vegForm`);
    reactCtx.setVegForm(event.target.value);
  };

  const handleTagsForm = (event) => {
    console.log(`${event.target.value} selected in tagsForm`);
    reactCtx.setTagsForm(event.target.value);
  };

  const handleCaloriesChange = (event) => {
    reactCtx.setCaloriesForm(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    reactCtx.setInstructionsForm(event.target.value);
  };

  const handlePrepTimeChange = (event) => {
    reactCtx.setPrepTimeForm(event.target.value);
  };

  return (
    <div className={styles.backdrop}>
      <div className={`${styles.board} ${styles.modal}`}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <form>
            {/* ==================== NAME ==================== */}
            <label className={styles.label}>Name: </label>
            <input
              type="text"
              placeholder="required field"
              value={reactCtx.nameForm}
              onChange={handleNameChange}
            ></input>
            <br />
            {/* nameForm state: {reactCtx.nameForm} <br /> */}
            {/* ==================== MEAT ==================== */}
            <label className={styles.label}>Protein: </label>
            <select
              id="meat"
              name="meat"
              onChange={handleMeatForm}
              value={reactCtx.meatForm}
            >
              <option value="chicken">Chicken</option>
              <option value="beef">Beef</option>
              <option value="pork">Pork</option>
              <option value="impossible Meat">Impossible Meat</option>
            </select>
            <br />
            {/* meatForm state: {reactCtx.meatForm} */}

            {/* ==================== VEG ==================== */}
            <label className={styles.label}>Veg: </label>
            <select
              id="veg"
              name="veg"
              onChange={handleVegForm}
              value={reactCtx.vegForm}
            >
              <option value="lettuce">Lettuce</option>
              <option value="cabbage">Cabbage</option>
              <option value="tomato">Tomato</option>
              <option value="baby spinach">Baby Spinach</option>
            </select>
            <br />
            {/* vegForm state: {reactCtx.vegForm} */}

            {/* ==================== TAGS ==================== */}
            <label className={styles.label}>Tags: </label>
            <select
              id="veg"
              name="veg"
              onChange={handleTagsForm}
              value={reactCtx.tagsForm}
            >
              <option value="healthy">Healthy</option>
              <option value="quick">Quick</option>
              <option value="easy">Easy</option>
              <option value="delicious">Delicious</option>
            </select>
            <br />
            {/* tagsForm state: {reactCtx.tagsForm} */}
            {/* ==================== CALORIES ==================== */}
            <label className={styles.label}>Calories: </label>
            <input
              type="number"
              placeholder="required field"
              value={reactCtx.caloriesForm}
              onChange={handleCaloriesChange}
            ></input>
            <br />
            {/* caloriesForm state: {reactCtx.caloriesForm} <br /> */}
            {/* ==================== INSTRUCTIONS ==================== */}
            <label className={styles.label}>Instructions: </label>
            <input
              type="text"
              value={reactCtx.instructionsForm}
              onChange={handleInstructionsChange}
            ></input>
            <br />
            {/* ==================== PREP TIME ==================== */}
            <label className={styles.label}>Preparation Time: </label>
            <input
              type="number"
              value={reactCtx.prepTimeForm}
              onChange={handlePrepTimeChange}
            ></input>
            <br />
          </form>
        </div>
        {/* ==================== UPDATE & CLOSE ==================== */}

        <footer className={styles.actions}>
          <button onClick={props.closeClicked}>Close</button>
          &nbsp;&nbsp;
          <button onClick={() => props.handleEditSubmit(reactCtx.idForm)}>
            Update
          </button>
        </footer>
      </div>
    </div>
  );
};

const EditRecipeModal = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <OverLay
          title={props.title}
          message={props.message}
          handleEditSubmit={props.handleEditSubmit}
          closeClicked={props.closeClicked}
        />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default EditRecipeModal;
