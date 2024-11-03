import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice";

function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
          borderColor: "#007bff",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#333" }}>
          Login
        </h3>

        {status === "failed" && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ marginTop: "10px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
