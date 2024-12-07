/* eslint-disable no-unused-vars */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./components/ThemeProvider";

const DarkMode = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-white border-2 border-white bg-transparent hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-white border-2  bg-transparent hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out mt-1 mb-2"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-white border-2  bg-transparent hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out mb-2"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-white border-2  bg-transparent hover:bg-black hover:text-white hover:ring-4 hover:ring-white hover:ring-opacity-50 transition-all duration-300 ease-in-out"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkMode;
