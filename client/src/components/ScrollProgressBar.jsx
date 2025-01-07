// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const glitch = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(3px); }
  100% { transform: translateX(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.7); }
  25% { box-shadow: 0 0 30px rgba(255, 0, 255, 1), 0 0 60px rgba(255, 0, 255, 0.7); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 255, 1), 0 0 80px rgba(0, 255, 255, 0.7); }
  75% { box-shadow: 0 0 50px rgba(0, 204, 255, 1), 0 0 100px rgba(0, 204, 255, 0.7); }
  100% { box-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.7); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -200%; }
  100% { background-position: 200%; }
`;

const reflect = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.5; }
  100% { opacity: 0.3; }
`;

const shadowPulse = keyframes`
  0% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); }
  50% { box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); }
  100% { box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); }
`;

// Styled components
const ProgressBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 100%;
  perspective: 1500px;

  @media (max-width: 768px) {
    height: 20px;
  }

  @media (max-width: 480px) {
    height: 15px;
  }
`;

const ProgressBar = styled.div`
  position: relative;
  width: ${({ scrollWidth }) => `${scrollWidth}%`};
  height: 20px;
  background: linear-gradient(120deg, #ff0066, #00ff66, #ffcc00, #0066ff);
  background-size: 300% 300%;
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
  transform: rotateX(10deg) translateZ(10px);
  animation: ${float} 1.5s infinite ease-in-out, ${glitch} 0.5s infinite,
    ${glow} 3s infinite alternate, ${shadowPulse} 2s infinite alternate,
    ${shine} 5s linear infinite;
  filter: blur(0.5px);
  transition: width 0.25s ease-out;

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
    font-size: 14px;
    font-weight: bold;
    opacity: 0.8;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    animation: ${glitch} 1s infinite linear, ${pulse} 1.5s infinite ease-in-out;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
    }
  }
`;

const Reflection = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(0, 255, 255, 0.2);
  transform: scaleY(-1);
  animation: ${reflect} 2s infinite alternate;

  @media (max-width: 768px) {
    height: 6px;
  }

  @media (max-width: 480px) {
    height: 4px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.2);
  mix-blend-mode: overlay;
`;

// Component
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
      <ProgressBar scrollWidth={scrollWidth}>
        <GlowEffect />
      </ProgressBar>
      <Reflection />
    </ProgressBarContainer>
  );
};

export default ScrollProgressBar;
