import React from 'react';
import { useNavigate } from 'react-router';

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* UFO Illustration with 404 */}
        <div className="mb-12 relative">
          <div className="flex items-end justify-center gap-4">
            {/* Left 4 */}
            <svg width="100" height="150" viewBox="0 0 100 150" className="inline-block">
              {/* Vertical line */}
              <rect x="10" y="10" width="15" height="130" fill="#7CB342" rx="2" />
              {/* Top horizontal */}
              <rect x="10" y="10" width="70" height="15" fill="#7CB342" rx="2" />
              {/* Middle horizontal */}
              <rect x="10" y="67" width="70" height="15" fill="#7CB342" rx="2" />
              {/* Right vertical (lower part) */}
              <rect x="65" y="82" width="15" height="58" fill="#7CB342" rx="2" />
            </svg>

            {/* UFO (0) */}
            <div className="inline-block relative" style={{ marginBottom: '10px' }}>
              <svg width="140" height="160" viewBox="0 0 140 160" className="inline-block">
                {/* UFO Dome */}
                <ellipse cx="70" cy="45" rx="42" ry="28" fill="#C5E1A5" />
                
                {/* UFO Body Top */}
                <ellipse cx="70" cy="60" rx="65" ry="12" fill="#689F38" />
                {/* UFO Body Bottom */}
                <ellipse cx="70" cy="65" rx="60" ry="10" fill="#558B2F" />
                
                {/* Windows */}
                <rect x="38" y="54" width="12" height="16" rx="2" fill="#33691E" opacity="0.7" />
                <rect x="64" y="54" width="12" height="16" rx="2" fill="#33691E" opacity="0.7" />
                <rect x="90" y="54" width="12" height="16" rx="2" fill="#33691E" opacity="0.7" />
                
                {/* Light Beam */}
                <path d="M 50 75 L 35 135 L 105 135 L 90 75 Z" 
                      fill="url(#beamGradient)" opacity="0.35" />
                
                {/* Light Circle on Ground */}
                <ellipse cx="70" cy="140" rx="45" ry="8" fill="#C5E1A5" opacity="0.5" />
                
                <defs>
                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#DCEDC8" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#DCEDC8" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Right 4 */}
            <svg width="100" height="150" viewBox="0 0 100 150" className="inline-block">
              {/* Vertical line (right side) */}
              <rect x="75" y="10" width="15" height="130" fill="#7CB342" rx="2" />
              {/* Top horizontal */}
              <rect x="20" y="10" width="70" height="15" fill="#7CB342" rx="2" />
              {/* Middle horizontal */}
              <rect x="20" y="67" width="70" height="15" fill="#7CB342" rx="2" />
              {/* Left vertical (lower part) */}
              <rect x="20" y="82" width="15" height="58" fill="#7CB342" rx="2" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Home Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-[#7CB342] hover:bg-[#689F38] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Home Page
        </button>

        {/* Optional: Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300 block mx-auto"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default Errorpage;