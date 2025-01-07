/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import { Button } from "./ui/button";

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const handleCloseSidebar = () => {
    setIsOpen(false); // Close the sidebar
  };

  const navLinkClass = (path) =>
    `border-2 py-3 px-6 rounded-md shadow-md transition-all duration-300 ease-in-out ${
      location.pathname === path
        ? "bg-white text-black" // Highlight selected
        : "bg-black text-white dark:text-white hover:bg-white hover:text-black"
    }`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Menu Button */}
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/50 transition-all duration-300 ease-in-out"
          variant="outline"
        >
          <Menu size={28} />
        </Button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent className="flex flex-col dark:bg-gray-900 bg-gray-100 border-2 border-gray-300 shadow-lg shadow-gray-300/50 backdrop-blur-md animate-slideInLeft">
        {/* Header */}
        <SheetHeader className="flex items-center justify-between mt-4 px-6">
          <SheetTitle className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-500 ease-in-out">
            <Link to="/" className="hover:scale-105">
              United LMS
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="flex flex-col px-6 space-y-6 mt-8">
          <Link
            to="/"
            onClick={handleCloseSidebar}
            className={navLinkClass("/")}
          >
            Home
          </Link>
          <Link
            to="/my-learning"
            onClick={handleCloseSidebar}
            className={navLinkClass("/my-learning")}
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            onClick={handleCloseSidebar}
            className={navLinkClass("/profile")}
          >
            Edit Profile
          </Link>

          {/* Dashboard Button for Instructors */}
          {user?.role === "instructor" && (
            <>
              <div className="border-t border-lime-500 my-6"></div>
              <div className="w-full">
                <Link
                  to="/admin/dashboard"
                  onClick={handleCloseSidebar}
                  className={navLinkClass("/admin/dashboard")}
                >
                  Dashboard
                </Link>
              </div>
            </>
          )}

          {/* Logout/Login Button */}
          {user ? (
            <button
              className="text-red-500 border-2 border-black bg-black hover:bg-white hover:text-red-500 transition-all duration-300 ease-in-out py-3 px-6 rounded-md shadow-md hover:shadow-lg hover:scale-105"
              onClick={() => {
                logoutHandler();
                handleCloseSidebar();
              }}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={handleCloseSidebar}
              className={navLinkClass("/login")}
            >
              Login
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
