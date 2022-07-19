import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Recipes from "./components/Recipes";
import CalorieTracker from "./components/CalorieTracker";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <div className="headerTitle">
        <h2>Recipe Tracker</h2>
      </div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Main" />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Recipes" element={<Recipes />} />
          <Route path="/CalorieTracker" element={<CalorieTracker />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
