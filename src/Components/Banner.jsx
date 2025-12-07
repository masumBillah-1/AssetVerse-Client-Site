import { Users, Shield, Zap, TrendingUp, Package, Award, ArrowRight, Star } from 'lucide-react';

const Banner = () => {
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
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-rotateIn {
          animation: rotateIn 0.8s ease-out forwards;
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
        
        .delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
          opacity: 0;
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      <section 
        id="home" 
        className="pt-28 pb-16 px-4 sm:px-6 md:px-10 lg:px-16 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#CBDCBD]/95 via-[#CBDCBD]/88 to-[#063A3A]/85 backdrop-blur-[1px]"></div>

        {/* Background Blur Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-5 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-[#063A3A] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-[#063A3A] rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* LEFT SIDE */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">

            <div className="inline-block px-4 py-2 bg-[#063A3A]/20 rounded-full border border-[#063A3A]/30 backdrop-blur-sm animate-fadeInUp delay-100">
              <span className="text-[#063A3A] font-semibold text-sm sm:text-base">🚀 Smart Asset Management Platform</span>
            </div>

            <h1 className="text-4xl sm:text-3xl md:text-3xl lg:text-5xl font-black text-[#063A3A] leading-tight animate-fadeInLeft delay-200">
              Manage Assets{" "}
              <span className="relative inline-block">
                Smarter
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 bg-[#063A3A]/20 -z-10 shimmer"></div>
              </span>{" "}
              & Faster
            </h1>

            <p className="text-sm sm:text-sm text-[#063A3A]/80 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fadeInLeft delay-300">
              Transform your asset management with our intelligent platform. Track, manage, and distribute company resources with zero hassle.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-3 animate-fadeInUp delay-400">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-[#063A3A] text-[#CBDCBD] rounded-xl text-base sm:text-lg font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 relative overflow-hidden">
                <span className="relative z-10">Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"></div>
              </button>

              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#063A3A] text-[#063A3A] rounded-xl text-base sm:text-lg font-bold hover:bg-[#063A3A] hover:text-[#CBDCBD] hover:scale-105 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* USER TRUST SECTION */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 animate-fadeInUp delay-500">

              {/* Avatars */}
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div
                    key={i}
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#063A3A] border-2 border-[#CBDCBD] flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                    style={{animationDelay: `${i * 0.1}s`}}
                  >
                    <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#CBDCBD]" />
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="text-center sm:text-left">
                <p className="text-[#063A3A] font-bold text-sm sm:text-base">500+ Companies Trust Us</p>
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 text-[#063A3A] fill-current hover:scale-125 transition-transform duration-300" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative mx-auto w-full max-w-md sm:max-w-sm lg:mt-0 animate-fadeInRight delay-300">
            <div className="relative w-full aspect-square md:-mt-10">

              {/* Back panel */}
              <div className="absolute inset-0 bg-[#063A3A] rounded-3xl rotate-6 scale-95 animate-pulse"></div>

              {/* Front panel */}
              <div className="absolute inset-0 bg-[#063A3A]/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center space-y-6 p-6 sm:p-10 animate-scaleIn delay-400">
                
                <div className="w-28 sm:w-32 h-28 sm:h-32 bg-[#CBDCBD] rounded-2xl flex items-center justify-center shadow-xl hover:rotate-12 hover:scale-110 transition-all duration-300 animate-float">
                  <Package className="w-14 sm:w-16 h-14 sm:h-16 text-[#063A3A]" />
                </div>

                <div className="text-center space-y-1 sm:space-y-2 animate-fadeInUp delay-500">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#CBDCBD]">50,000+</h3>
                  <p className="text-[#CBDCBD]/80 text-sm sm:text-base font-medium">Assets Successfully Tracked</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
                  {[
                    { icon: TrendingUp, text: '99.9% Uptime' },
                    { icon: Shield, text: 'Secure' },
                    { icon: Zap, text: 'Fast' },
                    { icon: Award, text: 'Trusted' }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className={`bg-[#CBDCBD]/10 rounded-xl p-3 sm:p-4 flex items-center space-x-2 border border-[#CBDCBD]/20 hover:bg-[#CBDCBD]/20 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-rotateIn delay-${(i + 6) * 100}`}
                    >
                      <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-[#CBDCBD]" />
                      <span className="text-[#CBDCBD] text-xs sm:text-sm font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Banner;