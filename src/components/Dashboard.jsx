import { useContext, useState } from "react";
import Menubar from "../components/Menubar";
import Sidebar from "../components/Sidebar";
import { AppContext } from '../context/AppContext.jsx';

const Dashboard = ({ children }) => {
  const { user } = useContext(AppContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Menubar fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Menubar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
      </div>

      {/* Layout wrapper (menubar ki height = 64px => mt-16) */}
      <div className="flex flex-1 pt-16">
        
        {/* Desktop Sidebar fixed */}
        <div className="hidden 2xl:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md z-40">
          <Sidebar />
        </div>

        {/* Mobile Sidebar (slide-in) */}
        {user && (
          <div
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform
              ${openSideMenu ? "translate-x-0" : "-translate-x-full"}
              transition-transform duration-300 ease-in-out z-50 2xl:hidden`}
          >
            <Sidebar />
          </div>
        )}

        {/* Main Content (scrollable) */}
        <main className="flex-1 2xl:ml-64 overflow-y-auto">
          <div className="p-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
