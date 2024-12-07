/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "@/components/Particles";

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
    <div className="relative h-screen overflow-hidden bg-[#0e0e0e]">
      {/* 3D Canvas */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full z-0"
        camera={{ position: [0, 0, 15], fov: 75 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <Particles exclusionZone={[0, 0, 4]} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-6 space-y-12">
        {/* Main Title */}
        <h1 className="text-white text-6xl md:text-8xl font-extrabold drop-shadow-lg animate__animated animate__fadeInUp animate__delay-1s transform hover:scale-110 hover:text-[#FF4C4C] transition-all duration-500 ease-in-out">
          Unlock Your Potential
        </h1>

        {/* Subheading */}
        <p className="text-[#a0a0a0] text-lg md:text-xl drop-shadow-lg animate__animated animate__fadeInUp animate__delay-2s transform hover:scale-105 hover:text-[#FF4C4C] transition-all duration-500 ease-in-out">
          Discover, Learn, and Transform with Our Expert-Curated Courses
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="flex items-center justify-center w-full max-w-[700px] bg-[#121212] rounded-full overflow-hidden shadow-2xl transition-all duration-300 ease-in-out"
        >
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses..."
            className="flex-grow px-6 py-4 text-sm md:text-lg text-white placeholder-[#999] bg-[#121212] border-2 border-transparent focus:border-[#FF4C4C] focus:ring-4 focus:ring-[#FF4C4C] rounded-full transition-all duration-500 ease-in-out focus:outline-none hover:ring-4 hover:ring-[#FF4C4C] hover:ring-opacity-50"
          />
          {/* Search Button */}
          <button
            type="submit"
            className="px-8 py-4 text-sm md:text-lg text-white bg-[#1e1e1e] rounded-full shadow-2xl transition-all duration-500 ease-in-out hover:bg-[#FF4C4C] hover:scale-125 hover:ring-4 hover:ring-[#FF4C4C] hover:ring-opacity-60 hover:shadow-xl focus:ring-4 focus:ring-[#FF4C4C] focus:ring-opacity-70 focus:scale-125"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
