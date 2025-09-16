import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../assets/sidebar_item_list";
import { AppContext } from '../context/AppContext.jsx';
import React, { useContext } from 'react';
import { User } from "lucide-react";
const Sidebar = () => {
  const { user } = useContext(AppContext)
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4 flex flex-col">
      {/* User Image Circle */}
      <div className="mt-4 mb-9 flex flex-col items-center w-full">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-600 flex items-center justify-center">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="text-grey" size={32} />
          )}
        </div>
        <div className="mt-2 text-center text-gray-800 font-semibold">
           {user?.name}
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon; // Directly use the imported icon component
          return (
            <NavLink
              to={item.route}
              key={item.key}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors ${isActive
                  ? "bg-blue-50 font-semibold bg-green-600 hover:bg-green-700"
                  : "text-gray-700"
                }`
              }
            >
              <Icon size={18} className="text-gray-600" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pt-6">
        <small className="text-xs text-gray-400">v1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;
