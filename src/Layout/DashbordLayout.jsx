import React, { useState } from "react";
import { Menu, Package, Plus, FileText, Users, Crown, User, LogOut, Bell, Home } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";



export default function DashboardLayout() {
  const PRIMARY = "#063A3A";
  const ACCENT = "#CBDCBD";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const { role: userRole, isLoading } = useRole(); // 🔹 get role from server

  // loading handle
if (isLoading) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center">
        <Package className="w-10 h-10 text-[var(--primary)] animate-spin" />
      </div>
    </div>
  );
}

  const MenuItems = [
    { icon: Home, label: "Asset List", path: "/dashboard", role: "hr" },
    { icon: Plus, label: "Add Asset", path: "/dashboard/add-asset", role: "hr" },
    { icon: FileText, label: "All Requests", path: "/dashboard/all-requests", role: "hr" },
    { icon: Users, label: "Employee List", path: "/dashboard/employee-list", role: "hr" },
    { icon: Crown, label: "Upgrade Package", path: "/dashboard/upgrade-package", role: "hr" },
    { icon: User, label: "Profile", path: "/dashboard/profile", role: "hr" },

    { icon: Package, label: "My Assets", path: "/dashboard/my-assets", role: "employee" },
    { icon: Plus, label: "Request Asset", path: "/dashboard/request-asset", role: "employee" },
    { icon: Users, label: "My Team", path: "/dashboard/my-team", role: "employee" },
    { icon: User, label: "Profile", path: "/dashboard/profile", role: "employee" },
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
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-[var(--primary)]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                    src={user?.photoURL || "https://i.ibb.co/ygZpQ9Y/default-avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* OUTLET */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
