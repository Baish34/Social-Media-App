import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
    </Router>
  );
}

export default App;

