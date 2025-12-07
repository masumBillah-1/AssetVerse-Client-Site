import { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import { Package, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home'); // active link state

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll + Active Link
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // adjust for navbar height
        behavior: "smooth",
      });
    }
    setActive(id); // set active link
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'packages', label: 'Packages' },
    { id: 'features', label: 'Features' },
    { id: 'faq', label: 'FAQ' },
  ];

  const linkClass = (id) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
      active === id ? "text-[#063A3A] bg-[#CBDCBD]" : "text-[#CBDCBD] hover:bg-[#CBDCBD]/10"
    }`;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#063A3A] shadow-xl" : "bg-[#063A3A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-[#CBDCBD] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Package className="w-7 h-7 text-[#063A3A]" />
            </div>
            <span className="text-3xl font-black text-[#CBDCBD]">AssetVerse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={linkClass(item.id)}
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-6 bg-[#CBDCBD]/30 mx-2"></div>

            <Link to="/login" className="px-4 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 cursor-pointer">Login</Link>
            <Link
              to="/register"
              className="ml-2 px-6 py-2.5 bg-[#CBDCBD] text-[#063A3A] rounded-lg font-bold hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Register
            </Link>

            <button className="px-4 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 cursor-pointer">Logout</button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-[#CBDCBD] p-2 cursor-pointer"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-2 animate-fade-in">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg cursor-pointer ${
                  active === item.id ? "bg-[#CBDCBD] text-[#063A3A]" : "text-[#CBDCBD] hover:bg-[#CBDCBD]/10"
                }`}
              >
                {item.label}
              </button>
            ))}

            <Link to="/login" className="block px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 cursor-pointer">Login</Link>
            <Link to="/register" className="block px-4 py-3 bg-[#CBDCBD] text-[#063A3A] rounded-lg text-center font-bold cursor-pointer">
              Register
            </Link>

            <button className="block w-full px-4 py-3 text-left text-[#CBDCBD] hover:bg-[#CBDCBD]/10 cursor-pointer">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
