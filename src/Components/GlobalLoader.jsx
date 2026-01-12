import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';

const GlobalLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#063A3A] via-[#0a5557] to-[#063A3A]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#CBDCBD]/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-[#CBDCBD]/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      {/* Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Rotating Ring */}
            <div className="absolute inset-0 w-32 h-32 border-4 border-[#CBDCBD]/20 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-transparent border-t-[#CBDCBD] rounded-full animate-spin"></div>
            
            {/* Center Icon */}
            <div className="relative w-32 h-32 bg-[#CBDCBD] rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
              <Package className="w-16 h-16 text-[#063A3A] animate-bounce" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl font-black text-[#CBDCBD] mb-4 tracking-tight">
          AssetVerse
        </h1>
        
        {/* Tagline */}
        <p className="text-[#CBDCBD]/80 text-lg mb-8 font-medium">
          Manage Your Assets Efficiently
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="h-2 bg-[#CBDCBD]/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-[#CBDCBD] to-white rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[#CBDCBD]/60 text-sm mt-3 font-semibold">
            Loading... {progress}%
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-[#CBDCBD] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#CBDCBD] rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-[#CBDCBD] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader;
