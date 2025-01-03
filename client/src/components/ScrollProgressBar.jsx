// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for 3D floating effect
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

// Keyframes for glitch effect
const glitch = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

// Keyframes for neon glow effect with color shift
const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.7); }
  25% { box-shadow: 0 0 30px rgba(255, 0, 255, 1), 0 0 60px rgba(255, 0, 255, 0.7); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(0, 255, 255, 0.7); }
  75% { box-shadow: 0 0 50px rgba(0, 204, 255, 1), 0 0 100px rgba(0, 204, 255, 0.7); }
  100% { box-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.7); }
`;

// Keyframes for reflective surface
const reflect = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.5; }
  100% { opacity: 0.3; }
`;

// Keyframes for shadow animation
const shadowPulse = keyframes`
  0% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); }
  50% { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); }
  100% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); }
`;

// Styled component for the progress bar container
const ProgressBarContainer = styled.div`
  position: fixed;
  top: 3px; /* Adjusted to move the progress bar higher */
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 100%;
  perspective: 1500px; /* Adds depth for 3D effect */
`;

// Styled component for the actual progress bar
const ProgressBar = styled.div`
  position: relative;
  width: ${({ scrollWidth }) => `${scrollWidth}%`};
  height: 15px; /* Increased height for more impact */
  background: linear-gradient(45deg, #ff0066, #00ff66, #ffcc00);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  transform: rotateX(10deg) translateZ(10px);
  animation: ${float} 1.5s infinite ease-in-out, ${glitch} 0.5s infinite,
    ${glow} 3s infinite alternate, ${shadowPulse} 2s infinite alternate;
  filter: blur(0.5px);
  transition: width 0.25s ease-out;
  z-index: 2;

  &:hover {
    animation: none;
    box-shadow: 0 0 60px rgba(0, 255, 255, 1), 0 0 120px rgba(255, 0, 255, 1);
    transform: scale(1.1) rotateX(5deg);
  }

  &::before {
    content: "Loading...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    z-index: 3;
    opacity: 0.7;
    animation: ${glitch} 1s infinite linear;
  }
`;

// Styled component for the reflective surface below the bar
const Reflection = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 5px;
  background: rgba(0, 255, 255, 0.2);
  transform: scaleY(-1);
  animation: ${reflect} 2s infinite alternate;
`;

const ScrollProgressBar = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollWidth(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ProgressBarContainer>
      <ProgressBar scrollWidth={scrollWidth} />
      <Reflection />
    </ProgressBarContainer>
  );
};

export default ScrollProgressBar;
