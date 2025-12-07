import React from 'react';
import {  Users, Shield, Zap,  BarChart3  } from 'lucide-react';

const About = () => {

  


  return (
    <div>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#063A3A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#CBDCBD]/10 backdrop-blur-sm rounded-full border border-[#CBDCBD]/20 mb-4">
              <span className="text-[#CBDCBD] font-semibold">Why AssetVerse?</span>
            </div>
            <h2 className="text-5xl font-black text-[#CBDCBD] mb-4">Built for Modern Teams</h2>
            <p className="text-xl text-[#CBDCBD]/70 max-w-2xl mx-auto">Four game-changing benefits that revolutionize asset management</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Zero Asset Loss', desc: 'Real-time tracking prevents asset misplacement and ensures accountability' },
              { icon: Users, title: 'Employee Tracking', desc: 'Know who has what equipment instantly with comprehensive logs' },
              { icon: Zap, title: 'Auto-Affiliation', desc: 'Automated employee onboarding cuts manual work by 90%' },
              { icon: BarChart3, title: 'Multi-Company', desc: 'Seamlessly manage assets across unlimited company profiles' }
            ].map((benefit, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-[#CBDCBD]/5 border-2 border-[#CBDCBD]/10 hover:border-[#CBDCBD]/30 hover:bg-[#CBDCBD]/10 transition-all duration-300 cursor-pointer">
                <div className="w-16 h-16 bg-[#CBDCBD] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-[#063A3A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#CBDCBD] mb-3">{benefit.title}</h3>
                <p className="text-[#CBDCBD]/70 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
