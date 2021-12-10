import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";

const App = function() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
