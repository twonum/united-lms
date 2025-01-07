/* eslint-disable no-unused-vars */
import { Menu, School } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const handleDropdownClose = () => {
    setIsDropdownOpen(false); // Close the dropdown when an item is clicked
  };

  return (
    <div className="h-16 fixed top-0 left-0 right-0 bg-transparent z-10 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-12 h-full px-6 backdrop-blur-md bg-opacity-60">
        <div className="flex items-center gap-3">
          <School size={30} color="white" />
          <Link to="/">
            <h1 className="font-extrabold text-3xl text-white hover:text-rose-600 transition-colors duration-300 ease-in-out">
              United LMS
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Avatar className="relative cursor-pointer overflow-hidden rounded-full w-10 h-10 md:w-11 md:h-11 hover:scale-110 transition-transform duration-500 ease-in-out transform-gpu hover:rotate-6 hover:shadow-xl hover:drop-shadow-[0_0_20px rgba(255,182,193,1)] hover:ring-4 hover:ring-teal-500">
                  {/* No gradient background effect, keeping the image colors intact */}

                  {/* Avatar Image */}
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                    className="object-cover rounded-full border-4 border-lime-600 shadow-inner hover:border-lime-400 transition-all duration-500 transform-gpu"
                  />

                  {/* Fallback text if image not available */}
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-teal-500 text-white font-extrabold text-xl shadow-xl hover:text-teal-300 transition-all duration-500 ease-in-out">
                    CN
                  </AvatarFallback>

                  {/* Hover Ring Animation */}
                  <div className="absolute inset-0 rounded-full border-2 border-teal-500 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[400px] h-[600px] bg-transparent border border-lime-500 shadow-[0_30px_150px_rgba(0,0,0,0.9)] rounded-[50px] transform scale-90 origin-top hover:scale-100 transition-transform duration-1200 ease-out overflow-y-auto">
                <DropdownMenuLabel className="font-extrabold text-center text-lime-600 text-4xl py-8 animate-fadeInDown tracking-wide ">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-lime-500 my-6" />
                <DropdownMenuGroup className="flex flex-col items-center gap-6">
                  {" "}
                  {/* Compact gap */}
                  <DropdownMenuItem
                    className="w-full animate-slideInUp"
                    onClick={handleDropdownClose}
                  >
                    <Link
                      to="/"
                      className="text-white w-full text-center justify-center items-center py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 hover:bg-gradient-to-bl hover:from-pink-500 hover:via-yellow-500 hover:to-orange-400 hover:scale-105 shadow-lg shadow-purple-500/40 hover:shadow-pink-500/50"
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "student" && (
                    <DropdownMenuItem
                      className="w-full animate-slideInUp"
                      onClick={handleDropdownClose}
                    >
                      <Link
                        to="/my-learning"
                        className="text-white w-full text-center justify-center items-center py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-br from-teal-500 via-green-400 to-emerald-600 hover:bg-gradient-to-bl hover:from-emerald-500 hover:via-blue-400 hover:to-cyan-500 hover:scale-105 shadow-lg shadow-green-400/40 hover:shadow-cyan-500/50"
                      >
                        My Learning
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="w-full animate-slideInUp"
                    onClick={handleDropdownClose}
                  >
                    <Link
                      to="/profile"
                      className="text-white w-full text-center justify-center items-center py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-br from-pink-500 via-rose-400 to-red-500 hover:bg-gradient-to-bl hover:from-red-500 hover:via-orange-400 hover:to-yellow-500 hover:scale-105 shadow-lg shadow-rose-400/40 hover:shadow-yellow-500/50"
                    >
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="w-full text-center justify-center items-center text-sky-50 py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-br from-red-600 via-rose-500 to-pink-400 hover:bg-gradient-to-bl hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 hover:scale-105 shadow-lg shadow-red-400/40 hover:shadow-blue-500/50 animate-slideInUp"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="border-lime-500 my-6" />
                    <DropdownMenuItem
                      onClick={handleDropdownClose}
                      className="w-full animate-slideInUp"
                    >
                      <Link
                        to="/admin/dashboard"
                        className="text-teal-200 w-full text-center justify-center items-center hover:text-emerald-200 py-6 px-10 rounded-2xl transition-all duration-700 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-lime-600 shadow-lg "
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-6">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-white border-2 border-white bg-[#212121] hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out px-5 py-2 rounded-lg"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="text-white border-2 border-white bg-transparent hover:bg-emerald-900 hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out px-5 py-2 rounded-lg"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-6 h-full">
        <Link to="/" className="hover:scale-105">
          <h1 className="font-extrabold text-2xl text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
            United LMS
          </h1>
        </Link>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;
