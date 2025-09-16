import React, { useState, useContext } from 'react';
import login_bg from "../assets/login_bg.webp";
import Input from "../components/Input.jsx";
import { validateAuth } from "../utils/valid.js";
import { API_ENDPOINTS } from '../utils/apiEndpoints.js';
import axiosInstance from '../utils/axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  //for setting user in context
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAuth(formData, "login");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      debugger
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === "error") {
        alert(response.data.message);
        return;
      }
      debugger
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <img
        src={login_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <form

        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-90 rounded shadow-md p-8 max-w-sm w-full z-10"
      >
        <h2 className="text-2xl font-semibold mb-1 text-center">Welcome Back</h2>
        <div className="text-base font-normal mb-6 text-center">Please enter your details to login</div>

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="name@gmail.com"
        />


        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="*********"
        />


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded mt-4"
        >
          Login
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have a login account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
