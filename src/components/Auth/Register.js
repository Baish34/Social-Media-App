import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    dispatch(registerUser({ userName, email, password }))
      .then((resultAction) => {
        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/main");
        } else {
          console.error(resultAction.error.message);
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
      });
  };
  

  return (
    <form onSubmit={handleRegister} className="container p-4">
      <h2>Register</h2>
      <div className="mb-3">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Register;
