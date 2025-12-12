import React, { useEffect, useState } from "react";
import { Menu, CheckCircle, AlertCircle, Clock, Package, Plus, FileText, Users, Crown, User, LogOut, Bell, Home } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import NotificationComponent from "../Components/Notification";
import useAxios from "../Hooks/useAxios"; // 🔥 Import করুন

export default function DashboardLayout() {
  const PRIMARY = "#063A3A";
  const ACCENT = "#CBDCBD";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // 🔥 MongoDB user data state
  const [mongoUser, setMongoUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);


  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios();

  const { user } = useAuth(); // Firebase user
  const { role: userRole, isLoading } = useRole();
useEffect(() => {
  if (user?.email) {
    axios.get(`/users/${user.email}`).then(({ data }) => {
      if (data.success) setMongoUser(data.user);
    });
  }
}, [user?.email]);
  // 🔥 Fetch MongoDB user data
  useEffect(() => {
    const fetchMongoUser = async () => {
      if (user?.email) {
        try {
          setUserLoading(true);
          const { data } = await axios.get(`/users/${user.email}`);
          if (data.success) {
            setMongoUser(data.user);
            console.log('✅ MongoDB User loaded:', data.user);
          }
        } catch (error) {
          console.error('❌ Error fetching MongoDB user:', error);
        } finally {
          setUserLoading(false);
        }
      }
    };

    fetchMongoUser();
  }, [user?.email, axios]);

  useEffect(() => {
    if (!isLoading) {
      if (userRole === "employee" && location.pathname === "/hr-dashboard") {
        navigate("em-dashboard", { replace: true });
      }
    }
  }, [userRole, isLoading, location.pathname, navigate]);

  // Loading state
  if (isLoading || userLoading) {
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
    { icon: Package, label: "My Assets", path: "/hr-dashboard/em-dashboard", role: "employee" },
    { icon: Plus, label: "Request Asset", path: "/hr-dashboard/request-asset", role: "employee" },
    { icon: Users, label: "My Team", path: "/hr-dashboard/my-team", role: "employee" },
    { icon: User, label: "Profile", path: "/hr-dashboard/profile", role: "employee" },
  ];
  
  const filteredMenuItems = MenuItems.filter(item => item.role === userRole);

  return (
    <div className="min-h-screen flex bg-[var(--accent)]" style={{ ['--primary']: PRIMARY, ['--accent']: ACCENT }}>
      {/* SIDEBAR */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[var(--primary)] transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4">
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <span className="text-xl font-bold text-[var(--accent)]">AssetVerse</span>
              </div>
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
            <button className="w-full mt-8 flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
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
              {/* 🔥 Notifications - MongoDB _id pass করা হচ্ছে */}
              {mongoUser && (
                <NotificationComponent userId={mongoUser._id} />
              )}
              
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                src={mongoUser?.photoURL || user?.photoURL || "https://i.ibb.co/ygZpQ9Y/default-avatar.png"}
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