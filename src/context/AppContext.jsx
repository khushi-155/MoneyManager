import React, { createContext, useState } from 'react';


const AppContext = createContext();

const AppProvider = ({ children }) => {
 
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});

const [name, setName] = useState(null);
const [profileImageUrl, setProfileImageUrl] = useState(null);
const clearUser = () => {
    setUser(null);
    setName(null);
    setProfileImageUrl(null);
    localStorage.clear(); // clear storage if needed
  };
const contextValue = {
  user,
  // name,  
  // profileImageUrl, 
  setUser,
  clearUser
  // setName,
  // setProfileImageUrl
};


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
