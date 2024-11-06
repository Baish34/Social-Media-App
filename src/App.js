import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LandingPage from "./components/LandingPage";
import Navbar from "./components/NavBar";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
    </Router>
  );
}

export default App;

