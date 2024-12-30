/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Particles from "@/components/Particles";

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
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4 md:px-6 space-y-10 transform translate-y-[-10%]">
        {/* Main Title */}
        <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-extrabold leading-snug animate__animated animate__fadeInUp animate__delay-1s hover:scale-110 hover:text-[#ff7043] transition-all duration-500">
          Unlock Your <span className="text-emerald-500">Potential</span>
        </h1>

        {/* Subheading */}
        <p className="text-[#e0e0e0] text-sm sm:text-lg md:text-2xl max-w-2xl animate__animated animate__fadeInUp animate__delay-2s hover:scale-110 hover:text-[#ff80ab] transition-all duration-500">
          Discover, Learn, and Transform with Our Expert-Curated Courses
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="relative flex items-center justify-between w-full max-w-[90%] sm:max-w-[700px] bg-transparent border border-white/50 rounded-full p-2 shadow-lg group hover:ring-4 hover:ring-[#ff7043] hover:scale-105 transition-transform duration-500"
        >
          {/* Glassmorphism Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffffff10] via-[#ffffff40] to-[#ffffff10] opacity-50 blur-3xl"></div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses..."
            className="relative z-10 w-full px-6 py-3 text-sm sm:text-base md:text-lg text-white bg-transparent border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff7043] placeholder-[#a8b9ab]"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="relative z-10 px-6 py-3 text-sm sm:text-base md:text-lg text-white bg-transparent border border-white/50 rounded-full hover:bg-[#ff7043] hover:text-black hover:ring-4 hover:ring-[#ff7043] hover:scale-110 transition-transform duration-500"
          >
            Search
          </button>
        </form>

        {/* Additional Interactive Section */}
        <div className="mt-10 w-full max-w-4xl flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-6">
          <div className="flex-1 bg-transparent border border-white/50 p-6 rounded-lg text-center hover:scale-105 hover:ring-4 hover:ring-[#ff7043] transition-transform duration-500">
            <h3 className="text-white text-xl font-bold">
              Personalized Learning
            </h3>
            <p className="text-[#e0e0e0] text-sm mt-2">
              Get course recommendations tailored to your interests and goals.
            </p>
          </div>
          <div className="flex-1 bg-transparent border border-white/50 p-6 rounded-lg text-center hover:scale-105 hover:ring-4 hover:ring-[#ff7043] transition-transform duration-500">
            <h3 className="text-white text-xl font-bold">Expert Mentors</h3>
            <p className="text-[#e0e0e0] text-sm mt-2">
              Learn from industry leaders and experienced professionals.
            </p>
          </div>
          <div className="flex-1 bg-transparent border border-white/50 p-6 rounded-lg text-center hover:scale-105 hover:ring-4 hover:ring-[#ff7043] transition-transform duration-500">
            <h3 className="text-white text-xl font-bold">Flexible Schedules</h3>
            <p className="text-[#e0e0e0] text-sm mt-2">
              Access courses anytime, anywhere, and at your own pace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
