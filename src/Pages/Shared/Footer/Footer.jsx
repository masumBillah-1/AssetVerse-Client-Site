import React from 'react';

import { Menu, X, ChevronDown, CheckCircle, Users, Shield, Zap, TrendingUp, Package, Clock, Award, ChevronRight, Mail, Phone, Facebook, Linkedin, Twitter, ArrowRight, Star, BarChart3, Bell, FileCheck } from 'lucide-react';

const Footer = () => {
    return (
        <div>
            {/* Footer */}
      <footer className="bg-[#063A3A] text-[#CBDCBD] py-16 px-4 border-t-4 border-[#CBDCBD]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#CBDCBD] rounded-xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-[#063A3A]" />
                </div>
                <span className="text-3xl font-black">AssetVerse</span>
              </div>
              <p className="text-[#CBDCBD]/70 mb-6 leading-relaxed">
                Smart asset management for modern companies. Track, manage, and grow efficiently.
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Twitter, link: '#' },
                  { icon: Facebook, link: '#' },
                  { icon: Linkedin, link: '#' }
                ].map((social, i) => (
                  <a key={i} href={social.link} className="w-11 h-11 bg-[#CBDCBD]/10 rounded-xl flex items-center justify-center hover:bg-[#CBDCBD] hover:scale-110 transition-all duration-300 group">
                    <social.icon className="w-5 h-5 text-[#CBDCBD] group-hover:text-[#063A3A]" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {['Documentation', 'API Reference', 'Support Center', 'Community', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-[#CBDCBD]/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#CBDCBD]/60 text-sm">
              © 2025 AssetVerse. All rights reserved. Made with ❤️ in Bangladesh
            </p>
            <div className="flex items-center space-x-6 text-sm text-[#CBDCBD]/60">
              <a href="#" className="hover:text-[#CBDCBD] transition">Privacy</a>
              <a href="#" className="hover:text-[#CBDCBD] transition">Terms</a>
              <a href="#" className="hover:text-[#CBDCBD] transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
            
        </div>
    );
};

export default Footer;