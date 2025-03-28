import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/Slice/authSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      alert("invalid email/password")
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md p-6 rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600 transition">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">Don't Have Account <Link to="/register" className="font-medium text-orange-500 underline ">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
