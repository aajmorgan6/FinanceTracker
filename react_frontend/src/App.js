import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import React from "react";
import HomePage from "./Pages/HomePage";
import AllExpensesPage from "./Pages/AllExpensesPage";

function App() {
    return (
      <Router>          
          <Routes>
            <Route exact path="/" element={<HomePage />}/>
            <Route exact path="/all" element={<AllExpensesPage />} />
          </Routes>
      </Router>
    );
}

export default App;