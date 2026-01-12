import { useEffect, useState } from "react";
import { CheckCircle, TrendingUp, Package, Award } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import useAxios from "../Hooks/useAxios";
import { SimpleLoader } from "./Loader";


const PackageSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role, isLoading } = useRole();
  const axiosPublic = useAxios(); // ✅ Use public axios

  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  // 🔹 Fallback packages (if API fails)
  const fallbackPackages = [
    {
      _id: "fallback-1",
      name: "Basic",
      price: 5,
      packageLimit: 5,
      popular: false,
      features: [
        "Up to 5 employees",
        "Basic asset tracking",
        "Email support",
        "Monthly reports"
      ]
    },
    {
      _id: "fallback-2",
      name: "Standard",
      price: 8,
      packageLimit: 10,
      popular: true,
      features: [
        "Up to 10 employees",
        "Advanced asset tracking",
        "Priority email support",
        "Weekly reports",
        "Custom notifications"
      ]
    },
    {
      _id: "fallback-3",
      name: "Premium",
      price: 15,
      packageLimit: 20,
      popular: false,
      features: [
        "Up to 20 employees",
        "Full asset management",
        "24/7 priority support",
        "Real-time analytics",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ];

  // 🔹 Icon mapping
  const iconMap = {
    Basic: Package,
    Standard: TrendingUp,
    Premium: Award,
  };

  // 🔹 Fetch packages from server (PUBLIC - no auth required)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        console.log('📦 Fetching packages from:', axiosPublic.defaults.baseURL + '/packages');
        const res = await axiosPublic.get("/packages");
        console.log('✅ Full response:', res);
        console.log('✅ Response data:', res.data);
        
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          console.log('✅ Setting packages from API:', res.data.length, 'items');
          setPackages(res.data);
        } else {
          console.warn('⚠️ No packages from API, using fallback data');
          setPackages(fallbackPackages);
          // Silently use fallback data
        }
      } catch (error) {
        console.error("❌ Failed to load packages:", error);
        console.error("Error response:", error.response);
        console.warn('⚠️ Using fallback packages due to error');
        setPackages(fallbackPackages);
        // Silently use fallback data without showing error toast
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, [axiosPublic]);

  // 🔹 Package button handler
  const handleChoosePackage = (pkg) => {
    if (isLoading) return;

    // 1️⃣ User not logged in → Login page
    if (!user) {
      toast.error("Please login first to purchase a package");
      navigate("/login", {
        state: { 
          from: "/",
          message: "Login to purchase a package" 
        }
      });
      return;
    }

    // 2️⃣ User is employee → Show error
    if (role === "employee") {
      toast.error("Only HR can purchase packages. Please contact your HR manager.");
      return;
    }

    // 3️⃣ User is HR → Navigate to upgrade page
    if (role === "hr") {
      navigate("/hr-dashboard/upgrade-package", {
        state: {
          packageId: pkg._id,
          packageName: pkg.name,
          price: pkg.price,
          limit: pkg.packageLimit,
        },
      });
    } else {
      // 4️⃣ Unknown role (fallback)
      toast.error("Invalid user role. Please contact support.");
    }
  };

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
      <section id="packages" className="  py-20 px-4 bg-[#CBDCBD]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#063A3A]/10 backdrop-blur-sm rounded-full border border-[#063A3A]/20 mb-4">
              <span className="text-[#063A3A] font-semibold">
                Pricing Plans
              </span>
            </div>
            <h2 className="text-5xl font-black text-[#063A3A] mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-[#063A3A]/70">
              Flexible pricing for businesses of every size
            </p>
          </div>

          {/* Loader */}
          {loadingPackages ? (
            <SimpleLoader message="Loading packages..." />
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl font-bold text-[#063A3A] mb-4">No packages available</p>
              <p className="text-[#063A3A]/70">Please check console for errors or run seed script</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 w-11/12 mx-auto">
              {packages.map((pkg) => {
                const Icon = iconMap[pkg.name] || Package;
                const isPopular = pkg.popular || pkg.name === "Standard";

                return (
                  <div
                    key={pkg._id}
                    className={`relative p-6 md:p-8 rounded-3xl transition-all duration-300 
                      ${
                        isPopular
                          ? "bg-[#063A3A] shadow-2xl md:scale-105 gradient-border"
                          : "bg-white/50 backdrop-blur-sm hover:shadow-xl border-2 border-[#063A3A]/20"
                      }`}
                  >
                    {/* Popular Badge */}
                    {isPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="px-6 py-2 bg-[#CBDCBD] text-[#063A3A] rounded-full text-[12px] font-black drop-shadow-lg">
                          ⭐ MOST POPULAR
                        </span>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 
                        ${
                          isPopular
                            ? "bg-[#CBDCBD]"
                            : "bg-[#063A3A]"
                        }`}
                    >
                      <Icon
                        className={`w-7 h-7 md:w-8 md:h-8 
                          ${
                            isPopular
                              ? "text-[#063A3A]"
                              : "text-[#CBDCBD]"
                          }`}
                      />
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-3xl font-black mb-2 
                        ${
                          isPopular
                            ? "text-[#CBDCBD]"
                            : "text-[#063A3A]"
                        }`}
                    >
                      {pkg.name}
                    </h3>

                    <p
                      className={`mb-6 ${
                        isPopular
                          ? "text-[#CBDCBD]/70"
                          : "text-[#063A3A]/70"
                      }`}
                    >
                      Perfect for {pkg.packageLimit} employees
                    </p>

                    {/* Price */}
                    <div className="mb-8 text-center">
                      <span
                        className={`text-4xl md:text-5xl lg:text-6xl font-black ${
                          isPopular
                            ? "text-[#CBDCBD]"
                            : "text-[#063A3A]"
                        }`}
                      >
                        ${pkg.price}
                      </span>
                      <span
                        className={`text-lg md:text-xl ${
                          isPopular
                            ? "text-[#CBDCBD]/70"
                            : "text-[#063A3A]/70"
                        }`}
                      >
                        /month
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle
                            className={`w-6 h-6 flex-shrink-0 ${
                              isPopular
                                ? "text-[#CBDCBD]"
                                : "text-[#063A3A]"
                            }`}
                          />
                          <span
                            className={`${
                              isPopular
                                ? "text-[#CBDCBD]/90"
                                : "text-[#063A3A]/90"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={() => handleChoosePackage(pkg)}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 
                        ${
                          isPopular
                            ? "bg-[#CBDCBD] text-[#063A3A] hover:shadow-xl"
                            : "bg-[#063A3A] text-[#CBDCBD] hover:shadow-lg"
                        }`}
                    >
                      Choose {pkg.name}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PackageSection;