/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground"; // Optional dynamic background

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Toggle the dropdown menu
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      {/* Floating Dropdown Button */}
      {!isSidebarOpen && (
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40">
          <button
            className={`w-full py-2 px-4 bg-transparent border border-white text-white rounded-md 
              hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:scale-105`}
            onClick={toggleDropdown}
          >
            Menu
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="mt-2 bg-black bg-opacity-90 text-white shadow-lg rounded-md 
              backdrop-blur-lg p-4 space-y-4 border border-gray-700"
            >
              <DropdownLink
                to="dashboard"
                label="Dashboard"
                closeMenu={toggleDropdown}
              />
              <DropdownLink
                to="course"
                label="Courses"
                closeMenu={toggleDropdown}
              />
              <DropdownLink
                to="email-responder"
                label="Emails"
                closeMenu={toggleDropdown}
              />
            </div>
          )}
        </div>
      )}

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
          onClick={() => {
            if (isSidebarOpen) setSidebarOpen(false);
            if (isDropdownOpen) setDropdownOpen(false);
          }}
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

// Reusable Dropdown Link Component
const DropdownLink = ({ to, label, closeMenu }) => (
  <Link
    to={to}
    onClick={closeMenu}
    className={`block px-4 py-2 text-white hover:bg-[#1abc9c] hover:text-black 
      rounded-md transition-all duration-300`}
  >
    {label}
  </Link>
);

export default Sidebar;
