/* eslint-disable react/prop-types */
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
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out"
          variant="outline"
        >
          <Menu size={28} color="white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col dark:bg-[#1C1C20] bg-white">
        <SheetHeader className="flex items-center justify-between mt-2 px-6">
          <SheetTitle className="font-bold text-xl text-white">
            <Link
              to="/"
              className="text-white dark:text-gray-200 hover:text-gray-300 transition-colors duration-300 ease-in-out"
            >
              United LMS
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <nav className="flex flex-col px-6 space-y-4 mt-4">
          <Link
            to="/my-learning"
            className="text-white dark:text-gray-300 hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-white dark:text-gray-300 hover:text-gray-300 py-2 px-4 rounded-md transition-all duration-300"
          >
            Edit Profile
          </Link>
          {user ? (
            <button
              className="text-red-500 dark:text-red-400 hover:text-red-400 py-2 px-4 rounded-md transition-all duration-300"
              onClick={logoutHandler}
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white border-2 border-white bg-transparent hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
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
