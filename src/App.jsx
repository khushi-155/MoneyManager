import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Expense from "./pages/Expense.jsx";
import Income from "./pages/Income.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Filter from "./pages/Filter.jsx";

import { AppProvider } from "./context/AppContext";  // Adjust this path accordingly
import { Sidebar } from "lucide-react";

const App = () => {

  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Root/>} />
          <Route path="/category" element={<Category />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/income" element={<Income />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

const Root = ()=>{
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated?(
    <Navigate to="/dashboard"/>
  ):(<Navigate to="/login"/>)
}

export default App;
