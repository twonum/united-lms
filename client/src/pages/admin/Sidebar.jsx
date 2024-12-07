/* eslint-disable no-unused-vars */
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import StarryBackground from "@/components/StarryBackground"; // Optional, if you want to add the dynamic background

const Sidebar = () => {
  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />

      <div className="flex min-h-screen bg-transparent">
        {/* Sidebar */}
        <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen bg-transparent backdrop-blur-lg shadow-xl">
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
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 sm:p-10 bg-transparent dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
