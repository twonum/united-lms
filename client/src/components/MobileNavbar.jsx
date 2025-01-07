/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu } from "lucide-react";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import { Button } from "./ui/button";

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <Sheet>
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
            className="text-black dark:text-white border-2 border-black bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out py-3 px-6 rounded-md shadow-md hover:shadow-lg hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/my-learning"
            className="text-black dark:text-white border-2 border-black bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out py-3 px-6 rounded-md shadow-md hover:shadow-lg hover:scale-105"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-black dark:text-white border-2 border-black bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out py-3 px-6 rounded-md shadow-md hover:shadow-lg hover:scale-105"
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
                  className="text-teal-200 w-full text-center flex justify-center items-center py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-lime-600 shadow-lg hover:scale-110"
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
              onClick={logoutHandler}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-black border-2 border-black bg-black hover:bg-white hover:text-black transition-all duration-300 ease-in-out py-3 px-6 rounded-md shadow-md hover:shadow-lg hover:scale-105"
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
