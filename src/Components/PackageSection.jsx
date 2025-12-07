import React from 'react';
import { CheckCircle, TrendingUp, Package, Award } from 'lucide-react';

const PackageSection = () => {
  const packages = [
    {
      name: 'Basic',
      limit: 5,
      price: 5,
      features: ['Up to 5 employees', 'Basic asset tracking', 'Email support', 'Monthly reports'],
      icon: Package
    },
    {
      name: 'Standard',
      limit: 10,
      price: 8,
      features: ['Up to 10 employees', 'Advanced tracking', 'Priority support', 'Weekly reports', 'Custom requests'],
      popular: true,
      icon: TrendingUp
    },
    {
      name: 'Premium',
      limit: 20,
      price: 15,
      features: ['Up to 20 employees', 'Full analytics', '24/7 support', 'Real-time reports', 'Multi-company support', 'API access'],
      icon: Award
    }
  ];

  return (
    <div>
      {/* CSS Embedded */}
      <style>{`
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-border {
          border: 4px solid transparent;
          border-radius: 1.5rem;
          background-image: linear-gradient(#063A3A, #063A3A), 
                            linear-gradient(270deg, #063A3A, #CBDCBD, #063A3A);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          animation: gradient-border 4s ease infinite;
        }
      `}</style>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-4 bg-[#CBDCBD]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#063A3A]/10 backdrop-blur-sm rounded-full border border-[#063A3A]/20 mb-4">
              <span className="text-[#063A3A] font-semibold">Pricing Plans</span>
            </div>
            <h2 className="text-5xl font-black text-[#063A3A] mb-4">Choose Your Perfect Plan</h2>
            <p className="text-xl text-[#063A3A]/70">Flexible pricing for businesses of every size</p>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`relative p-6 md:p-8 rounded-3xl transition-all duration-300 
                  ${pkg.popular
                    ? 'bg-[#063A3A] shadow-2xl md:scale-105 gradient-border'
                    : 'bg-white/50 backdrop-blur-sm hover:shadow-xl border-2 border-[#063A3A]/20'
                  }`}
              >
                {/* Most Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-6 py-2 bg-[#CBDCBD] text-[#063A3A] rounded-full text-sm font-black drop-shadow-lg">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 
                    ${pkg.popular ? 'bg-[#CBDCBD]' : 'bg-[#063A3A]'}`}
                >
                  <pkg.icon
                    className={`w-7 h-7 md:w-8 md:h-8 
                      ${pkg.popular ? 'text-[#063A3A]' : 'text-[#CBDCBD]'}`}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`text-3xl font-black mb-2 
                    ${pkg.popular ? 'text-[#CBDCBD]' : 'text-[#063A3A]'}`}
                >
                  {pkg.name}
                </h3>

                <p className={`${pkg.popular ? 'text-[#CBDCBD]/70' : 'text-[#063A3A]/70'} mb-6`}>
                  Perfect for {pkg.limit} employees
                </p>

                {/* Price */}
                <div className="mb-8 text-center">
                  <span className={`text-4xl md:text-5xl lg:text-6xl font-black ${pkg.popular ? 'text-[#CBDCBD]' : 'text-[#063A3A]'}`}>
                    ${pkg.price}
                  </span>
                  <span className={`text-lg md:text-xl ${pkg.popular ? 'text-[#CBDCBD]/70' : 'text-[#063A3A]/70'}`}>
                    /month
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <CheckCircle
                        className={`w-6 h-6 flex-shrink-0 ${pkg.popular ? 'text-[#CBDCBD]' : 'text-[#063A3A]'}`}
                      />
                      <span className={`${pkg.popular ? 'text-[#CBDCBD]/90' : 'text-[#063A3A]/90'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 
                    ${pkg.popular
                      ? 'bg-[#CBDCBD] text-[#063A3A] hover:shadow-xl'
                      : 'bg-[#063A3A] text-[#CBDCBD] hover:shadow-lg'
                    }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default PackageSection;
