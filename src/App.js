import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
  );
}

export default App;

