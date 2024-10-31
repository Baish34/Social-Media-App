import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container text-center p-5">
      <h1>Welcome to FriendLink</h1>
      <p>Please log in or register to get started.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
