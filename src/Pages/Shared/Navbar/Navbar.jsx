import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { useMongoUser } from '../../../context/UserContext';
import logo from '/assetverse-favicon.svg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const { user, logOut } = useAuth();
  const { mongoUser, loading: userLoading, role: userRole } = useMongoUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    // If not on home page, navigate to home first with hash
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setIsMenuOpen(false);
      return;
    }

    // If on home page, scroll to section
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setActive(id);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logOut()
      .then()
      .catch(() => {
        // Error handling
      });
  }

  const items = [
    { id: "home", label: "Home", isLink: true },
    { id: "about", label: "About" },
    { id: "packages", label: "Packages" },
    { id: "features", label: "Features" },
    { id: "faq", label: "FAQ" },
  ];

  const linkClass = (id) =>
    `px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 ${
      active === id
        ? "bg-[#CBDCBD] text-[#063A3A]"
        : "text-[#CBDCBD] hover:bg-[#CBDCBD]/10"
    }`;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#063A3A]/90 backdrop-blur-md shadow-xl' : 'bg-[#063A3A]/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <img className='w-15' src={logo} alt="" />
            <span className="text-3xl font-black text-[#CBDCBD]">AssetVerse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {items.map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  to="/"
                  className={linkClass(item.id)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={linkClass(item.id)}
                >
                  {item.label}
                </button>
              )
            ))}

            <div className="w-px h-6 bg-[#CBDCBD]/30 mx-2"></div>

            {user ? (
              <Link
                to={userRole === "hr" ? "/hr-dashboard" : userRole === "employee" ? "/em-dashboard" : "/hr-dashboard"}
                className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link to={'/register'} className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
                  Join as Employee
                </Link>

                <Link
                  to="/login"
                  className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  Join as HR
                </Link>
              </>
            )}

            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={mongoUser?.photoURL || user?.photoURL || "https://ctechinfomedia.in/img/avtar%20team.jpg"}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-3 shadow"
                  >
                    <li className="cursor-default">
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold text-base text-gray-800">
                          {mongoUser?.name || user?.displayName || "User"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {mongoUser?.email || user?.email}
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <button onClick={handleLogout} className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
                  SignOut
                </button>
              </>
            ) : (
              <>
                <Link to={'/login'} className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
                  Login
                </Link>

                <Link to={'/register'} className="ml-2 px-6 py-2.5 bg-[#CBDCBD] text-[#063A3A] rounded-lg font-bold hover:scale-105 hover:shadow-lg transition-all duration-200">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-[#CBDCBD] p-2">
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-2 animate-fade-in">
            {items.map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium ${
                    active === item.id
                      ? "bg-[#CBDCBD] text-[#063A3A]"
                      : "text-[#CBDCBD] hover:bg-[#CBDCBD]/10"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium ${
                    active === item.id
                      ? "bg-[#CBDCBD] text-[#063A3A]"
                      : "text-[#CBDCBD] hover:bg-[#CBDCBD]/10"
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}

            <div className="border-t border-[#CBDCBD]/20 my-2"></div>

            {/* Mobile Menu - User Authenticated */}
            {user ? (
              <>
                <Link 
                  to={userRole === "hr" ? "/hr-dashboard" : userRole === "employee" ? "/em-dashboard" : "/hr-dashboard"}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  Dashboard
                </Link>

                <div className="px-4 py-3 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={mongoUser?.photoURL || user?.photoURL || "https://ctechinfomedia.in/img/avtar%20team.jpg"}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#CBDCBD]">
                      {mongoUser?.name || user?.displayName || "User"}
                    </span>
                    <span className="text-xs text-[#CBDCBD]/70">
                      {mongoUser?.email || user?.email}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  SignOut
                </button>
              </>
            ) : (
              <>
                <Link 
                  to={'/register'}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  Join as Employee
                </Link>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  Join as HR
                </Link>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-[#CBDCBD] text-[#063A3A] rounded-lg font-bold text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;