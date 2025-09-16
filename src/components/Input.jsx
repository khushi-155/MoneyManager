import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react"; // Eye icons

const Input = ({ label, name, type = 'text', value, onChange, error, placeholder,isSelect, options }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 font-medium" htmlFor={name}>
        {label}
      </label>
       {isSelect ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-2 border rounded ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-700`}
        >
          <option value="">Select an option</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) :(
      <input
        id={name}
        name={name}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded pr-10 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      )}
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-10 text-gray-500"
        >
          {showPassword==false ?  <EyeOff size={18} /> : <Eye size={18} ></Eye>}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
