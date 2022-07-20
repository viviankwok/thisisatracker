import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          {/* <li>
            <NavLink
              to="/Main"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Home Page
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/Login"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Recipes"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Recipe Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/CalorieTracker"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Calorie Tracker
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
