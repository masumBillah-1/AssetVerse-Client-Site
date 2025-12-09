import { useEffect, useState } from 'react';
import { Package, Menu, X,} from 'lucide-react';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const  {user, logOut} = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
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

   const handleLogout = ()=> {
        logOut()
        .then()
        .catch(error => {
          console.log(error)
        })
  }


  const items = [
    { id: "home", label: "Home" },
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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#063A3A] shadow-xl' : 'bg-[#063A3A]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-[#CBDCBD] rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <Package className="w-7 h-7 text-[#063A3A]" />
            </div>
            <span className="text-3xl font-black text-[#CBDCBD]">AssetVerse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={linkClass(item.id)}
              >
                {item.label}
              </button>
            ))}

            <div className="w-px h-6 bg-[#CBDCBD]/30 mx-2"></div>

            <button className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Join as Employee
            </button>

            <button className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Join as HR
            </button>

            
              {
                user ?  <><div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
    
    <button onClick={handleLogout}  className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              SignOut
            </button>
    
    </> 
    
    
    
    : <>

                 <Link to={'/login'} className="px-5 py-2 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Login
            </Link>

            <Link to={'/register'} className="ml-2 px-6 py-2.5 bg-[#CBDCBD] text-[#063A3A] rounded-lg font-bold hover:scale-105 hover:shadow-lg transition-all duration-200">
              Register
            </Link>
                
                
                
                </>
                
               
              }
            
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
            ))}

            <div className="border-t border-[#CBDCBD]/20 my-2"></div>

            <button className="block px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Join as Employee
            </button>
            <button className="block px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Join as HR
            </button>
            <button className="block px-4 py-3 text-[#CBDCBD] hover:bg-[#CBDCBD]/10 rounded-lg font-medium">
              Login
            </button>
            <button className="block px-4 py-3 bg-[#CBDCBD] text-[#063A3A] rounded-lg font-bold text-center">
              Register
            </button>
          </div>
        )}
      </div>

















    </nav>












  );
};

export default Navbar;



