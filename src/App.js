import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage/HomePage";
import { getAllStores } from "./services/StoreService";

const App = () => {
  useEffect( async () => {
    try {
      const response = await getAllStores();
      if (response.status !== 200) {
        // Handle Http Error
      }
      console.log(response.data);
    }
    catch(e) {
      console.log(e);
    }
  }, []);

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
