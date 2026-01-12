import { useEffect, useState } from "react";
import { Menu, Package, Plus, FileText, Users, Crown, User, LogOut, Home } from "lucide-react";
import { Outlet, useNavigate, useLocation, Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import { useMongoUser, UserProvider } from "../context/UserContext";
import NotificationComponent from "../Components/Notification";

function DashboardContent() {
  const PRIMARY = "#063A3A";
  const ACCENT = "#CBDCBD";

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logOut } = useAuth();
  const { mongoUser, loading: userLoading, role: userRole, userId } = useMongoUser();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!userLoading && userRole) {
      if (userRole === "employee" && location.pathname.startsWith("/hr-dashboard")) {
        navigate("/em-dashboard", { replace: true });
      }

      if (userRole === "hr" && location.pathname.startsWith("/em-dashboard")) {
        navigate("/hr-dashboard", { replace: true });
      }
    }
  }, [userRole, userLoading, location.pathname, navigate]);

  // Loading state
  if (userLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center">
          <Package className="w-10 h-10 text-[var(--primary)] animate-spin" />
        </div>
      </div>
    );
  }

  const MenuItems = [
    // HR
    { icon: Home, label: "Asset List", path: "/hr-dashboard", role: "hr" },
    { icon: Plus, label: "Add Asset", path: "/hr-dashboard/add-asset", role: "hr" },
    { icon: FileText, label: "All Requests", path: "/hr-dashboard/all-requests", role: "hr" },
    { icon: Users, label: "Employee List", path: "/hr-dashboard/employee-list", role: "hr" },
    { icon: Crown, label: "Upgrade Package", path: "/hr-dashboard/upgrade-package", role: "hr" },
    { icon: User, label: "Profile", path: "/hr-dashboard/profile", role: "hr" },

    // Employee
    { icon: Package, label: "My Assets", path: "/em-dashboard", role: "employee" },
    { icon: Plus, label: "Request Asset", path: "/em-dashboard/request-asset", role: "employee" },
    { icon: Users, label: "My Team", path: "/em-dashboard/my-team", role: "employee" },
    { icon: User, label: "Profile", path: "/em-dashboard/profile", role: "employee" },
  ];
  
  const filteredMenuItems = MenuItems.filter(item => item.role === userRole);


  const handleLogout = () => {
  logOut()
    .then(() => {
      navigate("/login");
    })
    .catch(() => {
      // console.log(error);
    });
};

  return (
    <div className="min-h-screen flex bg-[var(--accent)]" style={{ ['--primary']: PRIMARY, ['--accent']: ACCENT }}>
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[var(--primary)] transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4">
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <Link to={'/'} className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <span className="text-xl font-bold text-[var(--accent)]">AssetVerse</span>
              </Link>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[var(--accent)] hover:bg-[var(--accent)]/10 p-2 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {filteredMenuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center cursor-pointer space-x-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-[var(--accent)] text-[var(--primary)]"
                    : "text-[var(--accent)] hover:bg-[var(--accent)]/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout */}
          {sidebarOpen && (
            <button  onClick={handleLogout} className="w-full cursor-pointer mt-8 flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 bg-white min-h-screen`}>
        {/* Header */}
        <header className="shadow-sm sticky top-0 z-20 bg-white">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary)]">
                {filteredMenuItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
              <p className="text-sm text-gray-600">Welcome back! Manage your assets efficiently</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* 🔥 Notifications - MongoDB _id from context */}
              {userId && (
                <NotificationComponent userId={userId} />
              )}
              
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                src={mongoUser?.photoURL || user?.photoURL || "https://ctechinfomedia.in/img/avtar%20team.jpg"}
                alt="profile"
                className="w-full h-full object-cover"
              />
              </div>
            </div>
          </div>
        </header>

        {/* OUTLET */}
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
}