import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

import { Menu, X, User, LogOut } from "lucide-react";
import { assets } from '../assets/assets.js';

const Menubar = ({ openSideMenu, setOpenSideMenu}) => {

  
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowDropdown(false)
    navigate("/login")
  }
   useEffect(() => {
    const handleClickOutside = (event) => {
      // Agar dropdown open hai aur click dropdownRef ke bahar hua
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if(showDropdown){
    document.addEventListener("mousedown", handleClickOutside);}
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpenSideMenu(prev => !prev)}
          className="2xl:hidden px-3 py-1 text-gray-400 hover:text-black bg-transparent rounded"
        >
          {openSideMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

        <img
          src={assets.logo}
          alt="MoneyManager Logo"
          className="h-8 w-16 object-contain"
        />
        <span className="text-lg font-semibold">MoneyManager</span>
      </div>

      <div className="relative">
        <span
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 cursor-pointer bg-grey hover:bg-green-700 p-1 rounded-full border-2 border-green-600 select-none mx-2"
        >
          <User size={22} />
        </span>
        {showDropdown && (
          <div ref={dropdownRef} 
          className="absolute right-0 mt-2 inline-block bg-white border border-gray-300 rounded shadow-lg z-20">
            <div className="p-4">
              <div className="flex items-center gap-2 text-base text-black-600">
                <span className="select-none text-gray-900  p-1 rounded-full border-2 border-green-600 rounded-full flex items-center justify-center">
                  <User size={13} />
                </span>
                <span >Logged in as:</span>
              </div>

              <div className="text-xs font-normal">{user.username}</div>
            </div>
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 font-normal"
              onClick={handleLogout}
            >
              <LogOut size={17} className="text-black-600" />
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Menubar;
