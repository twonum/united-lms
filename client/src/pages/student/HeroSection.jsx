/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "@/components/Particles";

// Importing Google Fonts (Poppins and Roboto)
import "@fontsource/poppins/400.css";
import "@fontsource/roboto/400.css";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] font-['Poppins']">
      {/* 3D Canvas */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full z-0"
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#ffffff" />
        <Particles exclusionZone={[0, 0, 4]} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-6 space-y-14 transform translate-y-[-10%]">
        {/* Main Title */}
        <h1 className="text-white text-7xl md:text-9xl font-extrabold animate__animated animate__fadeInUp animate__delay-1s transform hover:scale-125 hover:text-[#baff4c] hover:translate-y-[-5px] transition-all duration-500 ease-in-out">
          Unlock Your <span className="text-emerald-500">Potential</span>
        </h1>

        {/* Subheading */}
        <p className="text-[#e0e0e0] text-lg md:text-2xl animate__animated animate__fadeInUp animate__delay-2s transform hover:scale-125 hover:text-[#4cffa0] hover:translate-y-[-10px] hover:drop-shadow-[0_0_10px_#4cffa0] transition-all duration-700 ease-in-out">
          Discover, Learn, and Transform with Our Expert-Curated Courses
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="relative flex items-center justify-center w-full max-w-[1000px] bg-gradient-to-r from-[#1a1a1a] via-[#333333] to-[#1a1a1a] rounded-full p-2 transition-all duration-700 ease-in-out group hover:ring-4 hover:ring-[#4caf50] shadow-2xl hover:scale-110 transform hover:translate-y-[-5px]"
        >
          {/* Glassmorphism Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffffff10] via-[#ffffff40] to-[#ffffff10] opacity-60 blur-3xl"></div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses..."
            className="relative z-10 flex-grow px-10 py-2 text-lg md:text-xl text-[#f5f5f5] placeholder-[#a8b9ab] bg-transparent border-none focus:outline-none focus:ring-0 transition-all duration-500 ease-in-out transform group-hover:translate-x-4 group-hover:scale-110 shadow-lg focus:shadow-2xl focus:ring-[#4caf50] focus:ring-opacity-60"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="relative z-10 px-10 py-3 text-lg md:text-xl text-white bg-gradient-to-r from-[#1a1a1a] via-[#4a4a4a] to-[#1a1a1a] rounded-full transition-all duration-500 ease-in-out transform hover:scale-125 hover:ring-4 hover:ring-[#4caf50] hover:shadow-2xl hover:shadow-[#4caf50] focus:ring-4 focus:ring-[#4caf50] focus:ring-opacity-70 hover:text-[#ffffff] hover:bg-[#333333] hover:animate-pulse"
          >
            <span className="text-3xl md:text-4xl font-extrabold animate__animated animate__fadeInUp animate__delay-1s">
              Search 🏞
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
