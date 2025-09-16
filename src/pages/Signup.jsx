import React, { useState } from 'react';
import login_bg from "../assets/login_bg.webp";
import Input from "../components/Input.jsx";
import {validateAuth} from "../utils/valid.js";
import axiosInstance from '../utils/axiosConfig.js';
import { API_ENDPOINTS } from '../utils/apiEndpoints.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {ProfilePhotoSelector} from '../components/ProfilePhotoSelector.jsx';
import { UPLOAD_PROFILE_IMAGE } from '../utils/uploadprofileimage.js';


const Signup = () => {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  
  let profileImageUrl = "";

  const validationErrors = validateAuth(formData, "signup");
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  } 
  debugger
  try{
      if(formData.profilePhoto){
        debugger
        const imageUrl = await UPLOAD_PROFILE_IMAGE(formData.profilePhoto);
        profileImageUrl = imageUrl||"";
      }
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER,{
        email: formData.email,
        password: formData.password,
        fullName: formData.username,
        profileImageUrl
     })
     debugger
    console.log("Full API response:", response);
     if(response.status===201){
     setFormData({ username: '', email: '',password:''});
      toast.success("Signup successfully, Please activate your account through mail")
      alert("Signup successfully, Please activate your account through mail")
     navigate("/login");
     }
  }
  catch(err){
      console.log("Something went wrong",err)
      alert("Something went wrong")
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
        className="relative bg-white bg-opacity-90 rounded-lg p-8 max-w-md w-full z-10 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-1 text-center">Create An Account</h2>
        <div className="text-base font-normal mb-6 text-center">Start tracking your spendings by joining with us</div>

        <div className='flex justify-center'>
          <ProfilePhotoSelector 
           image={formData.profilePhoto}  
           setImage={(image) => setFormData(prev => ({ ...prev, profilePhoto: image }))} 
          />
        </div>
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
          placeholder="John Doe"
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
          Signup
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;