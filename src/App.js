import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
  );
}

export default App;

