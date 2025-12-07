import { useEffect, useRef } from 'react';
import { Users, Zap, Package, Clock, BarChart3, Bell, Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  const headerRef = useRef(null);
  const featureRefs = useRef([]);

  const features = [
    { 
      icon: Package, 
      title: 'Smart Asset Management', 
      desc: 'Track all company assets in one centralized dashboard with real-time updates and notifications',
      gradient: 'from-[#CBDCBD] to-[#d4e5c7]',
      delay: '0s'
    },
    { 
      icon: Users, 
      title: 'Employee Request System', 
      desc: 'Streamlined request workflow where employees can easily request needed assets',
      gradient: 'from-[#d4e5c7] to-[#e0f0d5]',
      delay: '0.1s'
    },
    { 
      icon: Zap, 
      title: 'Instant Auto-Affiliation', 
      desc: 'Automatically assign and link employees to companies after HR approval',
      gradient: 'from-[#e0f0d5] to-[#CBDCBD]',
      delay: '0.2s'
    },
    { 
      icon: BarChart3, 
      title: 'Multi-Company Dashboard', 
      desc: 'Manage and monitor assets across multiple companies from single interface',
      gradient: 'from-[#CBDCBD] to-[#d4e5c7]',
      delay: '0.3s'
    },
    { 
      icon: Clock, 
      title: 'Return Date Tracking', 
      desc: 'Smart alerts and reminders for returnable items and equipment',
      gradient: 'from-[#d4e5c7] to-[#e0f0d5]',
      delay: '0.4s'
    },
    { 
      icon: Bell, 
      title: 'Real-time Notifications', 
      desc: 'Get instant updates on asset requests, approvals, and returns',
      gradient: 'from-[#e0f0d5] to-[#CBDCBD]',
      delay: '0.5s'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          
          if (entry.target.classList.contains('feature-card')) {
            const index = featureRefs.current.indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
          }
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    featureRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <style>{`
        @keyframes gradientRotate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(203, 220, 189, 0.2); }
          50% { box-shadow: 0 0 40px rgba(203, 220, 189, 0.4); }
        }

        @keyframes borderGlow {
          0%, 100% { 
            border-color: rgba(203, 220, 189, 0.1);
            box-shadow: 0 0 0 rgba(203, 220, 189, 0);
          }
          50% { 
            border-color: rgba(203, 220, 189, 0.5);
            box-shadow: 0 0 30px rgba(203, 220, 189, 0.3);
          }
        }

        .gradient-bg {
          background: linear-gradient(135deg, #063A3A 0%, #0a5555 25%, #0d7070 50%, #0a5555 75%, #063A3A 100%);
          background-size: 300% 300%;
          animation: gradientRotate 10s ease infinite;
        }

        .header-animate {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .icon-container {
          position: relative;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-card:hover .icon-container {
          animation: float 3s ease-in-out infinite;
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(203, 220, 189, 0.3) 50%,
            transparent 70%
          );
          transform: rotate(45deg);
          transition: all 0.6s;
        }

        .feature-card:hover .shine-effect::before {
          left: 100%;
          top: 100%;
        }

        .feature-card:hover .border-animate {
          animation: borderGlow 2s ease-in-out infinite;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-card:hover .feature-title {
          animation: slideInUp 0.4s ease forwards;
        }

        .feature-card:hover .feature-desc {
          animation: slideInUp 0.5s ease forwards;
        }

        .number-badge {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .ripple-effect::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          border: 2px solid rgba(203, 220, 189, 0.5);
          animation: ripple 2s ease-out infinite;
        }
      `}</style>

      <section id="features" className="py-20 px-4 gradient-bg relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-80 h-80 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.75s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div ref={headerRef} className="text-center mb-20 header-animate">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/20 mb-6">
              <Sparkles className="w-5 h-5 text-[#CBDCBD]" />
              <span className="text-[#CBDCBD] font-bold text-lg">Core Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Everything You Need</h2>
            <p className="text-xl md:text-2xl text-[#CBDCBD]/80">Powerful tools to manage assets like a pro</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                ref={el => featureRefs.current[i] = el}
                className="feature-card group relative"
              >
                <div className="relative p-8 rounded-2xl bg-[#CBDCBD]/5 backdrop-blur-sm border-2 border-[#CBDCBD]/10 hover:border-[#CBDCBD]/40 hover:bg-[#CBDCBD]/10 transition-all duration-500 hover:scale-105 shine-effect border-animate h-full">
                  
                  {/* Number Badge */}
                  <div className={`number-badge bg-gradient-to-br ${feature.gradient} text-[#063A3A]`}>
                    {i + 1}
                  </div>

                  {/* Ripple Effect on Hover */}
                  <div className="absolute inset-0 ripple-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Icon Container */}
                  <div className="icon-container mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                      {/* Icon Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <feature.icon 
                        className="w-10 h-10 text-[#063A3A] relative z-10 group-hover:scale-110 transition-transform duration-500" 
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="feature-title text-2xl md:text-3xl font-black text-[#CBDCBD] mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="feature-desc text-[#CBDCBD]/70 text-lg leading-relaxed group-hover:text-[#CBDCBD]/90 transition-colors duration-300">
                    {feature.desc}
                  </p>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <button className="group px-10 py-5 bg-gradient-to-r from-[#CBDCBD] to-[#d4e5c7] text-[#063A3A] rounded-xl font-black text-xl hover:scale-105 hover:shadow-2xl hover:shadow-[#CBDCBD]/30 transition-all duration-300 relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Explore All Features
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;