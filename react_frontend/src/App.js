import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React from "react";
import HomePage from "./Pages/HomePage";

function App() {
    return (
      <Router>          
          <Routes>
            <Route exact path="/" element={<HomePage />}/>
          </Routes>
      </Router>
    );
}

export default App;