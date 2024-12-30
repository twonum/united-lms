import Navbar from "@/components/Navbar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollProgressBar />
      <div className="flex-1 mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
