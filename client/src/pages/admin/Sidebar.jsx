/* eslint-disable no-unused-vars */
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground"; // Optional, if you want to add the dynamic background

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      {/* Toggle Button for Small Devices */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-[#1abc9c] text-white rounded-full p-3 shadow-lg focus:outline-none hover:bg-[#16A085] transition-all duration-300"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div className="flex min-h-screen bg-transparent">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative z-10 top-0 left-0 w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 bg-gray-800 lg:bg-transparent backdrop-blur-lg shadow-xl transition-transform duration-500 ease-in-out`}
        >
          <nav className="space-y-6">
            {/* Dashboard Link */}
            <Link
              to="dashboard"
              className="flex items-center gap-3 text-white hover:text-[#1abc9c] dark:hover:text-[#16A085] border-b border-transparent hover:border-[#1abc9c] dark:hover:border-[#16A085] transition-all duration-300"
            >
              <ChartNoAxesColumn size={22} className="text-[#ecf0f1]" />
              <span className="text-lg font-medium">Dashboard</span>
            </Link>

            {/* Courses Link */}
            <Link
              to="course"
              className="flex items-center gap-3 text-white hover:text-[#1abc9c] dark:hover:text-[#16A085] border-b border-transparent hover:border-[#1abc9c] dark:hover:border-[#16A085] transition-all duration-300"
            >
              <SquareLibrary size={22} className="text-[#ecf0f1]" />
              <span className="text-lg font-medium">Courses</span>
            </Link>

            {/* Email Responder */}
            <Link
              to="email-responder"
              className="flex items-center gap-3 text-white hover:text-[#1abc9c] dark:hover:text-[#16A085] border-b border-transparent hover:border-[#1abc9c] dark:hover:border-[#16A085] transition-all duration-300"
            >
              <SquareLibrary size={22} className="text-[#ecf0f1]" />
              <span className="text-lg font-medium">Entertain Emails</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 p-5 sm:p-10 bg-transparent dark:bg-gray-800"
          onClick={() => isSidebarOpen && setSidebarOpen(false)} // Close sidebar on content click
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
