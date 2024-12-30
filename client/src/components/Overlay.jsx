/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const Overlay = ({ showOverlay, setShowOverlay }) => {
  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
        showOverlay ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-transparent rounded-lg border-2 border-white shadow-lg w-11/12 sm:w-1/2 lg:w-1/3 z-10 overflow-hidden"
        style={{
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Terms and Conditions
        </h2>
        <p className="text-sm text-white opacity-80 mb-8">
          {/* Your terms and conditions content */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra
          nisi lorem, euismod interdum ante dictum sit amet. Nulla facilisi. Ut
          euismod elit justo, non tempor erat vestibulum eget. Vivamus dictum
          suscipit purus, non facilisis augue consequat eget.
        </p>
        <div className="text-center">
          <button
            onClick={closeOverlay}
            className="px-8 py-3 rounded-full text-white border-2 border-white hover:border-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none transition-all duration-500 transform hover:scale-110 ease-in-out shadow-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
