import React from 'react';
import { useNavigate } from 'react-router';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import useRole from '../../../Hooks/useRole';

const DashboardErrorpage = () => {
  const navigate = useNavigate();
  const { role, isLoading } = useRole();

  const goToDashboard = () => {
    if (role === 'hr') {
      navigate('/hr-dashboard');
    } else if (role === 'employee') {
      navigate('/em-dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* UFO Illustration with 404 */}
        <div className="mb-12 relative">
          <div className="flex items-end justify-center gap-4">
            {/* Left 4 */}
            <svg width="90" height="130" viewBox="0 0 90 130" className="inline-block">
              {/* Vertical line */}
              <rect x="10" y="10" width="12" height="110" fill="#06393a" rx="2" />
              {/* Top horizontal */}
              <rect x="10" y="10" width="60" height="12" fill="#06393a" rx="2" />
              {/* Middle horizontal */}
              <rect x="10" y="59" width="60" height="12" fill="#06393a" rx="2" />
              {/* Right vertical (lower part) */}
              <rect x="58" y="71" width="12" height="49" fill="#06393a" rx="2" />
            </svg>

            {/* UFO (0) */}
            <div className="inline-block relative" style={{ marginBottom: '5px' }}>
              <svg width="130" height="145" viewBox="0 0 130 145" className="inline-block">
                {/* UFO Dome */}
                <ellipse cx="65" cy="40" rx="38" ry="25" fill="#4DB6AC" />
                
                {/* UFO Body Top */}
                <ellipse cx="65" cy="53" rx="58" ry="11" fill="#00897B" />
                {/* UFO Body Bottom */}
                <ellipse cx="65" cy="57" rx="54" ry="9" fill="#00695C" />
                
                {/* Windows */}
                <rect x="36" y="48" width="10" height="14" rx="2" fill="#004D40" opacity="0.7" />
                <rect x="60" y="48" width="10" height="14" rx="2" fill="#004D40" opacity="0.7" />
                <rect x="84" y="48" width="10" height="14" rx="2" fill="#004D40" opacity="0.7" />
                
                {/* Light Beam */}
                <path d="M 46 66 L 32 120 L 98 120 L 84 66 Z" 
                      fill="url(#beamGradient2)" opacity="0.35" />
                
                {/* Light Circle on Ground */}
                <ellipse cx="65" cy="125" rx="42" ry="7" fill="#80CBC4" opacity="0.5" />
                
                <defs>
                  <linearGradient id="beamGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B2DFDB" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#B2DFDB" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Right 4 */}
            <svg width="90" height="130" viewBox="0 0 90 130" className="inline-block">
              {/* Vertical line (right side) */}
              <rect x="68" y="10" width="12" height="110" fill="#06393a" rx="2" />
              {/* Top horizontal */}
              <rect x="20" y="10" width="60" height="12" fill="#06393a" rx="2" />
              {/* Middle horizontal */}
              <rect x="20" y="59" width="60" height="12" fill="#06393a" rx="2" />
              {/* Left vertical (lower part) */}
              <rect x="20" y="71" width="12" height="49" fill="#06393a" rx="2" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The dashboard page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={goToDashboard}
            disabled={isLoading}
            className="bg-[#06393a] hover:bg-[#06393a]/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <LayoutDashboard className="w-5 h-5" />
            {isLoading ? 'Loading...' : 'My Dashboard'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Home Page
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-300 flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default DashboardErrorpage;