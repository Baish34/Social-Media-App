import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    
    dispatch(loginUser({ email, password, secret: "supersecretkey" }))
      .then((resultAction) => {
        if (resultAction.type === loginUser.fulfilled.type) {
          navigate("/main"); 
        } else {
          console.error(resultAction.error.message); 
        }
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
  };
  
  
  return (
    <form onSubmit={handleLogin} className="container p-4">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
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
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
