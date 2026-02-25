import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading Holy Quran...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-quran-parchment">
      <div className="relative w-64 h-64">
        {/* Islamic geometric pattern background */}
        <div className="absolute inset-0 islamic-pattern rounded-lg"></div>
        
        {/* Pulsing circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-8 border-quran-green border-t-quran-gold rounded-full animate-spin"></div>
        </div>
        
        {/* Center ornament */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-quran-green animate-pulse">☪</div>
        </div>
      </div>
      
      <p className="mt-8 text-xl font-serif text-quran-green animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;
