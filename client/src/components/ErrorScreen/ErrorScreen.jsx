import React from "react";

const ErrorScreen = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-500 via-rose-400 to-pink-300">
      
      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10 flex flex-col items-center space-y-6">

        {/* Error Icon Animation */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>

          {/* Pulsing Red Circle */}
          <div className="absolute inset-2 bg-red-500 rounded-full animate-pulse"></div>

          {/* Cross Icon */}
          <svg
            className="w-8 h-8 text-white relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold tracking-wide">
          {message}
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-sm text-center">
          Please check your connection or try again.
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-2 bg-white text-red-600 font-medium rounded-lg shadow-lg hover:bg-red-50 transition-all duration-300 hover:scale-105"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;