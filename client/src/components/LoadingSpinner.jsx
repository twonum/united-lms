import { Loader } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-6 py-8 overflow-hidden">
      {/* Outer glow effect */}
      <motion.div
        className="absolute animate-pulse h-80 w-80 bg-white/20 rounded-full opacity-30 z-0"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* 3D rotating spinner with shadow effect */}
      <motion.div
        className="relative z-10 flex justify-center items-center"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          scale: [1, 1.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <Loader className="animate-spin h-40 w-40 md:h-56 md:w-56 text-white transform duration-500 ease-in-out shadow-[0_10px_20px_0px_rgba(255,255,255,0.3)] hover:scale-110 focus:scale-110" />
      </motion.div>

      {/* Elegant and smooth text */}
      <motion.p
        className="mt-4 text-lg md:text-2xl font-semibold text-white transition-all duration-300 ease-in-out tracking-wider z-10"
        animate={{
          opacity: [0, 1],
          y: [-20, 0],
          scale: [0.9, 1],
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        Loading, please wait...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
