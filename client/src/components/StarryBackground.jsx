"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

const StarryBackground = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black", // Ensures the background is black
        pointerEvents: "none", // Prevents blocking interactions
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <Stars
        radius={120} // Increase the radius to make the stars spread out more
        depth={100} // Increase the depth to make it more complex
        count={8000} // Increase the number of stars to make it more filled
        factor={5} // Increase the factor to make stars bigger
        saturation={0.5} // Slightly adjust the saturation for a more vibrant look
        fade={true} // Keep fade for a softer, more realistic effect
        speed={1} // Increase speed for more dynamic motion
      />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.5} // Slow down the auto-rotation for a smoother experience
      />
    </Canvas>
  );
};

export default StarryBackground;
