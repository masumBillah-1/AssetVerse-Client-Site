import { ArrowRight, Star, Package, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';

const Banner = () => {
  const { user } = useAuth();
  const { role, isLoading } = useRole();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80';
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  const handlePrimaryAction = () => {
    if (isLoading) return;

    if (user && role === "employee") {
      navigate("/em-dashboard");
    } 
    else if (user && role === "hr") {
      navigate("/hr-dashboard");
    } 
    else {
      navigate("/register");
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes bgFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slowZoom {
          animation: slowZoom 20s ease-in-out infinite;
        }

        .bg-fade-in {
          animation: bgFadeIn 0.8s ease-out forwards;
        }

        .animate-floatSlow {
          animation: floatSlow 15s ease-in-out infinite;
        }

        .animate-pulse-custom {
          animation: pulse 8s ease-in-out infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <section 
        id="home" 
        className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden flex items-center"
      >
        {/* Background Image with Overlay */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
            imageLoaded ? 'animate-slowZoom bg-fade-in' : 'opacity-0'
          }`}
          style={{
            backgroundImage: imageLoaded 
              ? 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)' 
              : 'none',
            backgroundColor: '#06393a', // Fallback color while loading
          }}
        >
          {/* Teal/Dark Green Gradient Overlay - #06393a */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(6, 57, 58, 0.95) 0%, rgba(6, 57, 58, 0.90) 50%, rgba(6, 57, 58, 0.95) 100%)'
          }}></div>
        </div>

        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
               }}>
          </div>
        </div>

        {/* Animated Circles with Float Effect */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl animate-floatSlow animate-pulse-custom" style={{backgroundColor: 'rgba(6, 57, 58, 0.3)'}}></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl animate-floatSlow animate-pulse-custom" style={{backgroundColor: 'rgba(6, 57, 58, 0.4)', animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl animate-floatSlow animate-pulse-custom" style={{backgroundColor: 'rgba(203, 220, 188, 0.1)', animationDelay: '2s'}}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Content */}
          <div className="text-center space-y-5 mb-12">
            
            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight animate-fadeInUp delay-100">
              ASSET LIFECYCLE
            </h1>

            {/* Decorative Line */}
            <div className="w-32 h-1 bg-white mx-auto shimmer-line animate-fadeInUp delay-200"></div>

            {/* Description */}
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-300 pt-2">
              Delivering data-driven lifecycle asset management solutions that improve reliability, extend asset life, and drive operational efficiency. Optimizing asset performance while reducing risk and total cost.
            </p>

            {/* CTA Button */}
            <div className="animate-fadeInUp delay-400 pt-2">
              <button
                onClick={handlePrimaryAction}
                disabled={isLoading}
                style={{
                  backgroundColor: '#CBDCBC',
                  color: '#06393a'
                }}
                className={`group px-8 py-4 text-lg font-bold 
                transition-all duration-300 flex items-center space-x-2 mx-auto shadow-2xl rounded-lg
                ${isLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-105 hover:shadow-[#CBDCBC]/50"}`}
              >
                <span>{isLoading ? "Loading..." : "Start Project"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center space-x-2 animate-fadeInUp delay-500 pt-2">
              <div className="flex space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white font-semibold">100+ positive reviews</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slideDown delay-500">
            
            {/* Stat 1 */}
            <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">120+</h3>
              <p className="text-white/80 font-semibold">Projects Done</p>
            </div>

            {/* Stat 2 */}
            <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">300+</h3>
              <p className="text-white/80 font-semibold">Assets Managed</p>
            </div>

            {/* Stat 3 */}
            <div className="glass-effect rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-black text-white mb-2">10+</h3>
              <p className="text-white/80 font-semibold">Years Experience</p>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 animate-fadeInUp delay-600">
            {[
              'Real-time Tracking',
              'Automated Workflows', 
              'Advanced Analytics',
              'Secure & Compliant'
            ].map((feature, i) => (
              <div 
                key={i}
                className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Banner;