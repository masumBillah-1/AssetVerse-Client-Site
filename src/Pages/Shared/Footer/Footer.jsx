import React from 'react';
import { Link } from 'react-router';
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
                <li>
                  <Link to="/" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/#about" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/#features" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/#packages" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-[#CBDCBD]/70 mt-0.5 flex-shrink-0" />
                  <a href="mailto:support@assetverse.com" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] transition-all duration-200">
                    support@assetverse.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 text-[#CBDCBD]/70 mt-0.5 flex-shrink-0" />
                  <a href="tel:+8801234567890" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] transition-all duration-200">
                    +880 1234-567890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Package className="w-5 h-5 text-[#CBDCBD]/70 mt-0.5 flex-shrink-0" />
                  <span className="text-[#CBDCBD]/70">
                    Dhaka, Bangladesh
                  </span>
                </li>
                <li>
                  <Link to="/contact" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Contact Us →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/gdpr" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    GDPR Compliance
                  </Link>
                </li>
                <li>
                  <Link to="/licenses" className="text-[#CBDCBD]/70 hover:text-[#CBDCBD] hover:translate-x-1 inline-block transition-all duration-200">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#CBDCBD]/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#CBDCBD]/60 text-sm">
              © 2025 AssetVerse. All rights reserved. Made with ❤️ in Bangladesh
            </p>
            <div className="flex items-center space-x-6 text-sm text-[#CBDCBD]/60">
              <Link to="/privacy" className="hover:text-[#CBDCBD] transition">Privacy</Link>
              <Link to="/terms" className="hover:text-[#CBDCBD] transition">Terms</Link>
              <Link to="/contact" className="hover:text-[#CBDCBD] transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
            
        </div>
    );
};

export default Footer;