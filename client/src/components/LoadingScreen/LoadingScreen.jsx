import React from "react";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-400">
      
      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10 flex flex-col items-center space-y-6">
        
        {/* Animated Loader */}
        <div className="relative w-20 h-20">
          
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
          
          {/* Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-l-white border-b-transparent border-r-transparent animate-spin"></div>
          
          {/* Inner Pulse Dot */}
          <div className="absolute inset-5 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Text */}
        <h2 className="text-white text-xl font-semibold tracking-wide animate-pulse">
          {message}
        </h2>

        {/* Sub text */}
        <p className="text-white/80 text-sm">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;