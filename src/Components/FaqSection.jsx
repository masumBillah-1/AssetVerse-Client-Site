import { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const faqRefs = useRef([]);
  const headerRef = useRef(null);

  const faqs = [
    { q: 'How do employees join a company?', a: 'Employees simply register on the platform and send a join request to their desired company. HR managers review and approve or reject requests based on verification.' },
    { q: 'What happens after HR approval?', a: 'Once approved by HR, employees are automatically affiliated with the company and gain access to request assets, view company resources, and manage their profile.' },
    { q: 'Can employees work for multiple companies?', a: 'Yes! Employees can be affiliated with multiple companies simultaneously and can request and manage assets from each company separately.' },
    { q: 'How does the asset tracking system work?', a: 'HR managers add all company assets to the platform. When employees request and receive assets, the system automatically tracks assignment, usage, and return dates with real-time updates.' },
    { q: 'What are returnable vs non-returnable items?', a: 'Returnable items (laptops, phones) must be returned and are tracked with due dates. Non-returnable items (office supplies) are permanently assigned once distributed.' },
    { q: 'Can I upgrade or downgrade my package?', a: 'Absolutely! You can change your subscription package at any time to match your growing or changing needs. The system will prorate the charges accordingly.' }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          
          if (entry.target.classList.contains('faq-item')) {
            const index = faqRefs.current.indexOf(entry.target);
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
            }, index * 100);
          }
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    faqRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-border {
          0%, 100% { 
            border-color: rgba(203, 220, 189, 0.1);
            box-shadow: 0 0 0 rgba(203, 220, 189, 0);
          }
          50% { 
            border-color: rgba(203, 220, 189, 0.4);
            box-shadow: 0 0 20px rgba(203, 220, 189, 0.2);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            max-height: 500px;
            transform: translateY(0);
          }
        }

        .gradient-bg {
          background: linear-gradient(135deg, #063A3A 0%, #0a5555 50%, #063A3A 100%);
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        .header-animate {
          opacity: 0;
          transform: translateY(-30px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .faq-item {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .faq-card {
          position: relative;
          overflow: hidden;
        }

        .faq-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(203, 220, 189, 0.1), transparent);
          transition: left 0.5s;
        }

        .faq-card:hover::before {
          left: 100%;
        }

        .faq-card.active {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .answer-slide {
          animation: slideDown 0.4s ease-out forwards;
        }

        .icon-bounce {
          animation: float 2s ease-in-out infinite;
        }

        .number-badge {
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #CBDCBD, #d4e5c7);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: #063A3A;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(203, 220, 189, 0.3);
          z-index: 10;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(203, 220, 189, 0) 0%,
            rgba(203, 220, 189, 0.2) 50%,
            rgba(203, 220, 189, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <section id="faq" className="py-20 px-4 gradient-bg relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#CBDCBD] rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-20 opacity-10 icon-bounce">
          <HelpCircle className="w-16 h-16 text-[#CBDCBD]" />
        </div>
        <div className="absolute bottom-32 right-20 opacity-10 icon-bounce" style={{animationDelay: '1s'}}>
          <HelpCircle className="w-20 h-20 text-[#CBDCBD]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16 header-animate">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border-2 border-[#CBDCBD]/20 mb-6">
              <Sparkles className="w-5 h-5 text-[#CBDCBD]" />
              <span className="text-[#CBDCBD] font-bold text-lg">FAQ</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#CBDCBD] mb-6">Got Questions?</h2>
            <p className="text-xl md:text-2xl text-[#CBDCBD]/80">We've got answers to everything you need to know</p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                ref={el => faqRefs.current[i] = el}
                className={`faq-item faq-card bg-[#CBDCBD]/5 backdrop-blur-sm border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[#CBDCBD]/10 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#CBDCBD]/10 relative pl-8
                  ${openFaq === i ? 'border-[#CBDCBD]/40 active' : 'border-[#CBDCBD]/10'}
                `}
              >
                {/* Number Badge */}
                <div className="number-badge">
                  {i + 1}
                </div>

                {/* Question Button */}
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-lg md:text-xl text-[#CBDCBD] pr-4 group-hover:text-white transition-colors duration-300">
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#CBDCBD]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#CBDCBD]/20 group-hover:rotate-90
                    ${openFaq === i ? 'bg-[#CBDCBD]/20' : ''}
                  `}>
                    <ChevronDown 
                      className={`w-6 h-6 text-[#CBDCBD] transition-transform duration-300 
                        ${openFaq === i ? 'rotate-180' : ''}
                      `} 
                    />
                  </div>
                </button>

                {/* Answer */}
                {openFaq === i && (
                  <div className="answer-slide px-8 pb-6">
                    <div className="border-t-2 border-[#CBDCBD]/10 pt-4">
                      <p className="text-[#CBDCBD]/80 text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                )}

                {/* Shimmer Effect */}
                {openFaq === i && (
                  <div className="absolute inset-0 shimmer pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-[#CBDCBD]/70 text-lg mb-4">Still have questions?</p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#CBDCBD] to-[#d4e5c7] text-[#063A3A] rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-[#CBDCBD]/20 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqSection;