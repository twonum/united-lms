/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Dynamic3DHeading from "@/components/ui/Dynamic3DHeading";
import StarryBackground from "@/components/StarryBackground"; // Optional, if you want to add the dynamic background
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/"); // Redirect to the home page or main route
    toast.success("Redirecting to Home");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent text-white">
      <Navbar />
      {/* Starry Background */}
      <div className="absolute inset-0 z-[-1]">
        <StarryBackground />
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 px-4 py-6 sm:px-8 lg:px-16">
        {/* Display 404 Image */}
        <img
          alt="404 Not Found"
          src="/404.svg" // Ensure the 404 image is placed in the /public folder
          className="w-full max-w-lg mx-auto object-contain rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
        />

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-shadow-md">
          Oops! Page Not Found.
        </h1>

        <p className="text-xl sm:text-2xl mb-6 text-center">
          The page you're looking for does not exist. Please check the URL or go
          back to the homepage.
        </p>

        {/* Button to navigate back to Home */}
        <Button
          onClick={navigateHome}
          className="px-12 py-5 text-lg font-semibold border border-white text-white rounded-lg shadow-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 mt-6 sm:mt-8"
        >
          Go Back Home
        </Button>
        <Dynamic3DHeading />
      </div>
    </div>
  );
};

export default NotFound;
