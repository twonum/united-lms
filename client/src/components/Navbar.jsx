/* eslint-disable no-unused-vars */
import { Menu, School } from "lucide-react";
import { useEffect } from "react";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

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
    <div className="h-16 fixed top-0 left-0 right-0 bg-transparent z-10 shadow-2xl transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-12 h-full px-6 backdrop-blur-md bg-opacity-60">
        <div className="flex items-center gap-3">
          <School size={30} color="white" />
          <Link to="/">
            <h1 className="font-extrabold text-3xl text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
              United LMS
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-transparent border border-gray-700 shadow-xl rounded-lg transition-all duration-300">
                <DropdownMenuLabel className="font-semibold text-white text-lg">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      to="/"
                      className="text-white hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="/my-learning"
                      className="text-white hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
                    >
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to="/profile"
                      className="text-white hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
                    >
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="text-red-500 hover:text-red-400 py-2 px-4 rounded-md transition-all duration-300"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        to="/admin/dashboard"
                        className="text-white hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
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
        <h1 className="font-extrabold text-2xl text-white hover:text-gray-400 transition-colors duration-300 ease-in-out">
          United LMS
        </h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;
