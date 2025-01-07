/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground"; // Optional dynamic background

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      {/* Toggle Button */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-30 
          bg-black text-white px-5 py-2 rounded-md shadow-md 
          hover:bg-white hover:text-black hover:shadow-lg 
          focus:outline-none focus:ring focus:ring-gray-400 
          transition-all duration-300`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      {/* Sidebar and Overlay */}
      <div className="flex min-h-screen">
        {/* Overlay for small devices */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed z-30 top-0 left-0 w-[250px] sm:w-[300px] h-full 
          bg-black bg-opacity-90 backdrop-blur-xl border-r border-gray-700 
          p-6 space-y-8 shadow-lg transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:relative lg:shadow-none 
          transition-transform duration-500 ease-in-out`}
        >
          {/* Navigation Links */}
          <nav className="space-y-6">
            <SidebarLink
              to="dashboard"
              icon={ChartNoAxesColumn}
              label="Dashboard"
            />
            <SidebarLink to="course" icon={SquareLibrary} label="Courses" />
            <SidebarLink
              to="email-responder"
              icon={SquareLibrary}
              label="Entertain Emails"
            />
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 p-5 sm:p-10 bg-transparent dark:bg-gray-800"
          onClick={() => isSidebarOpen && setSidebarOpen(false)} // Auto-close sidebar on content click
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, icon: Icon, label }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 text-white 
      hover:text-[#1abc9c] border-b border-transparent 
      hover:border-[#1abc9c] transition-all duration-300`}
  >
    <Icon size={22} className="text-[#ecf0f1]" />
    <span className="text-lg font-medium">{label}</span>
  </Link>
);

export default Sidebar;
