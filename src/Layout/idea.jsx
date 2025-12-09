import React, { useMemo, useState } from "react";
import {
  Menu,
  Package,
  Plus,
  FileText,
  Users,
  Crown,
  User,
  LogOut,
  Bell,
  Home,
} from "lucide-react";

// ============================================
// COMPONENT IMPORTS (alada alada files hoye separate)
// ============================================

// AssetListPage Component
function AssetListPage({ assetsPage, search, setSearch, page, setPage, totalPages, deleteAsset, updateAsset, PRIMARY, ACCENT }) {
  const { Search, Package: PackageIcon, CheckCircle, FileText: FileIcon, Users: UsersIcon, PieChart, BarChart3, Printer, Trash2 } = require("lucide-react");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: String(assetsPage.length), icon: PackageIcon },
          { label: "Available", value: "18", icon: CheckCircle },
          { label: "Assigned", value: "6", icon: UsersIcon },
          { label: "Requests", value: "3", icon: FileIcon }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[var(--primary)]/10 hover:shadow-xl transition" style={{ borderColor: `${PRIMARY}20` }}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <div className="text-3xl font-black text-[var(--primary)]">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" /> Asset Distribution
          </h3>
          <div className="h-64 flex items-center justify-center text-center text-gray-500">Pie Chart Placeholder</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-[var(--primary)] mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" /> Monthly Requests
          </h3>
          <div className="h-64 flex items-center justify-center text-center text-gray-500">Bar Chart Placeholder</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[var(--primary)]">All Assets</h3>
          <div className="relative w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search assets..." className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)] focus:outline-none w-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--primary)]/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Image</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Type</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {assetsPage.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-2xl">{asset.image}</td>
                  <td className="px-6 py-4">{asset.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${asset.type === "Returnable" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{asset.quantity}</td>
                  <td className="px-6 py-4">{asset.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => window.print()} className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center space-x-1">
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                      <button onClick={() => deleteAsset(asset.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold flex items-center space-x-1">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
          <div className="flex space-x-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// AddAssetPage Component
function AddAssetPage({ addAsset, PRIMARY, ACCENT }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Returnable");
  const [quantity, setQuantity] = useState(1);
  const [imagePlaceholder, setImagePlaceholder] = useState("📦");

  function handleSubmit(e) {
    e.preventDefault();
    addAsset({ name, type, quantity: Number(quantity), image: imagePlaceholder });
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" /> Add New Asset
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">Product Name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
            <option>Returnable</option>
            <option>Non-returnable</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">Quantity</label>
          <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--primary)] block mb-1">Image (demo)</label>
          <input placeholder="ImgBB upload integration can be added here" className="w-full px-4 py-2 border rounded-lg" />
          <p className="text-xs text-gray-500 mt-1">Current demo uses emoji placeholder — replace with ImgBB flow</p>
        </div>
        <div className="flex space-x-3">
          <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">Submit</button>
          <button type="button" className="px-4 py-2 border rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
}

// AllRequestsPage Component
function AllRequestsPage({ requests, approveRequest, rejectRequest, PRIMARY, ACCENT }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2" /> All Requests
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--primary)]/5">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Asset</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{req.employee}</td>
                <td className="px-6 py-4">{req.asset}</td>
                <td className="px-6 py-4">{req.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-lg font-semibold text-sm ${req.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button onClick={() => approveRequest(req.id)} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">Approve</button>
                        <button onClick={() => rejectRequest(req.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">Reject</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// EmployeeListPage Component
function EmployeeListPage({ employees, removeFromTeam, PRIMARY, ACCENT }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2" /> Employees
      </h3>
      <div className="space-y-3">
        {employees.map((e) => (
          <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{e.image}</div>
              <div>
                <p className="font-bold text-[var(--primary)]">{e.name}</p>
                <p className="text-sm text-gray-600">{e.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{e.assetCount} Assets</span>
              <button onClick={() => removeFromTeam(e.id, e.affiliations?.[0]?.company || "")} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// RequestAssetPage Component
function RequestAssetPage({ assets, setRequests, PRIMARY, ACCENT }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  function handleRequestClick(asset) {
    setSelectedAsset(asset);
    setShowModal(true);
  }

  function handleSubmitRequest() {
    if (!selectedAsset) return;
    const req = {
      id: Date.now(),
      employeeId: 99,
      employee: "You (demo)",
      assetId: selectedAsset.id,
      asset: selectedAsset.name,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      note,
    };
    setRequests((prev) => [req, ...prev]);
    setShowModal(false);
    setNote("");
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.filter((a) => a.quantity > 0).map((asset) => (
          <div key={asset.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="w-full h-32 bg-[var(--accent)] rounded-xl flex items-center justify-center text-5xl mb-4">{asset.image}</div>
            <h3 className="text-xl font-bold text-[var(--primary)] mb-2">{asset.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset.type === "Returnable" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{asset.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available:</span>
                <span className="text-lg font-bold text-[var(--primary)]">{asset.quantity}</span>
              </div>
            </div>
            <button onClick={() => handleRequestClick(asset)} className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:shadow-lg transition">Request Asset</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">Request Asset</h3>
            <p className="text-gray-600 mb-4">Asset: <span className="font-bold text-[var(--primary)] ml-1">{selectedAsset?.name}</span></p>
            <label className="block text-sm font-bold text-[var(--primary)] mb-2">Additional Note</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="4" placeholder="Why do you need this asset?" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)]"></textarea>
            <div className="flex space-x-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold">Cancel</button>
              <button onClick={handleSubmitRequest} className="flex-1 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold">Send Request</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// MyAssetsPage Component
function MyAssetsPage({ assignedAssets, returnAssignedAsset, PRIMARY, ACCENT }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div className="w-full h-32 bg-[var(--accent)] rounded-xl flex items-center justify-center text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-[var(--primary)] mb-1">{asset.asset}</h3>
            <p className="text-sm text-gray-600 mb-2">{asset.company}</p>
            <p className="text-sm">Requested: <span className="font-semibold">{asset.requestDate}</span></p>
            <p className="text-sm mb-4">Approved: <span className="font-semibold">{asset.approvalDate}</span></p>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset.status === "approved" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{asset.status}</span>
            <div className="mt-4 flex space-x-2">
              {asset.status === "approved" && <button onClick={() => returnAssignedAsset(asset.id)} className="px-3 py-2 bg-orange-500 text-white rounded-lg">Return</button>}
              <button onClick={() => window.print()} className="px-3 py-2 bg-[var(--primary)] text-white rounded-lg">Print</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// MyTeamPage Component  
function MyTeamPage({ employees, selectedCompany, setSelectedCompany, PRIMARY, ACCENT }) {
  const companies = ["TechCorp BD", "InnovateLabs", "GlobalSolutions"];
  const upcomingBirthdays = [
    { name: "John Doe", date: "Dec 15", image: "👨", daysLeft: 9 },
    { name: "Jane Smith", date: "Dec 22", image: "👩", daysLeft: 16 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <label className="block text-sm font-bold text-[var(--primary)] mb-3">Select Company</label>
        <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)] font-semibold">
          {companies.map((company, i) => (
            <option key={i} value={company}>{company}</option>
          ))}
        </select>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-4">🎂 Upcoming Birthdays</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingBirthdays.map((b, i) => (
            <div key={i} className="bg-white/20 p-4 rounded-xl flex items-center space-x-4">
              <span className="text-3xl">{b.image}</span>
              <div>
                <p className="font-bold">{b.name}</p>
                <p className="text-sm">📅 {b.date} • {b.daysLeft} days left</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" /> Team Members
        </h3>
        <div className="space-y-3">
          {employees.map((e) => (
            <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{e.image}</div>
                <div>
                  <p className="font-bold text-[var(--primary)]">{e.name}</p>
                  <p className="text-sm text-gray-600">{e.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{e.assetCount} Assets</span>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// UpgradePackagePage Component
function UpgradePackagePage({ PRIMARY, ACCENT }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Crown className="w-5 h-5 mr-2" /> Upgrade Package
      </h3>
      <p className="text-gray-600">Integrate Stripe for payment processing</p>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[
          { name: "Starter", price: "Free", limit: 10 },
          { name: "Pro", price: "$49/mo", limit: 100 },
          { name: "Enterprise", price: "$199/mo", limit: 1000 }
        ].map((p, i) => (
          <div key={i} className="p-4 rounded-xl border">
            <h4 className="font-bold text-[var(--primary)]">{p.name}</h4>
            <p className="text-sm text-gray-600">{p.price}</p>
            <p className="mt-2">Package limit: {p.limit}</p>
            <button className="mt-4 px-3 py-2 bg-[var(--primary)] text-white rounded">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ProfilePage Component
function ProfilePage({ role, PRIMARY, ACCENT }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-2xl">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" /> Profile
      </h3>
      <p className="text-gray-600">Current Role: {role}</p>
      <div className="mt-4">
        <label className="block text-sm font-semibold text-[var(--primary)] mb-2">Company Logo</label>
        <input className="w-full px-4 py-2 border rounded-lg" placeholder="Upload / change logo" />
      </div>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD LAYOUT (শুধু Sidebar থাকবে)
// ============================================

export default function DashboardLayout() {
  const PRIMARY = "#063A3A";
  const ACCENT = "#CBDCBD";

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState("hr");
  const [activePage, setActivePage] = useState("asset-list");
  const [selectedCompany, setSelectedCompany] = useState("TechCorp BD");

  // Data states
  const [assets, setAssets] = useState([
    { id: 1, name: "MacBook Pro", type: "Returnable", quantity: 5, date: "2024-12-01", image: "💻" },
    { id: 2, name: "Office Chair", type: "Non-returnable", quantity: 10, date: "2024-11-15", image: "🪑" },
    { id: 3, name: "iPhone 15", type: "Returnable", quantity: 3, date: "2024-12-05", image: "📱" },
    { id: 4, name: "Monitor", type: "Returnable", quantity: 8, date: "2024-11-20", image: "🖥️" },
  ]);

  const [requests, setRequests] = useState([
    { id: 1, employeeId: 1, employee: "John Doe", assetId: 1, asset: "MacBook Pro", date: "2024-12-06", status: "pending", note: "For project X" },
    { id: 2, employeeId: 2, employee: "Jane Smith", assetId: 3, asset: "iPhone 15", date: "2024-12-05", status: "pending", note: "Testing app" },
    { id: 3, employeeId: 3, employee: "Mike Johnson", assetId: 4, asset: "Monitor", date: "2024-12-04", status: "approved", note: "" },
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2024-01-15", assetCount: 3, image: "👨", affiliations: [{ company: "TechCorp BD", active: true }] },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joinDate: "2024-02-20", assetCount: 2, image: "👩", affiliations: [{ company: "TechCorp BD", active: true }] },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "2024-03-10", assetCount: 1, image: "👨", affiliations: [{ company: "InnovateLabs", active: true }] },
  ]);

  const [assignedAssets, setAssignedAssets] = useState([
    { id: 1, employeeId: 1, assetId: 1, asset: "MacBook Pro", company: "TechCorp BD", requestDate: "2024-11-20", approvalDate: "2024-11-21", status: "approved" },
  ]);

  // Menu items
  const hrMenuItems = [
    { icon: Home, label: "Asset List", page: "asset-list" },
    { icon: Plus, label: "Add Asset", page: "add-asset" },
    { icon: FileText, label: "All Requests", page: "all-requests" },
    { icon: Users, label: "Employee List", page: "employee-list" },
    { icon: Crown, label: "Upgrade Package", page: "upgrade-package" },
    { icon: User, label: "Profile", page: "profile" },
  ];

  const employeeMenuItems = [
    { icon: Package, label: "My Assets", page: "my-assets" },
    { icon: Plus, label: "Request Asset", page: "request-asset" },
    { icon: Users, label: "My Team", page: "my-team" },
    { icon: User, label: "Profile", page: "profile" },
  ];

  const menuItems = currentRole === "hr" ? hrMenuItems : employeeMenuItems;

  // Functions
  function approveRequest(requestId) {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r))
    );

    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setAssets((prev) => prev.map((a) => (a.id === req.assetId ? { ...a, quantity: Math.max(0, a.quantity - 1) } : a)));

    const assign = {
      id: Date.now(),
      employeeId: req.employeeId,
      assetId: req.assetId,
      asset: req.asset,
      company: selectedCompany,
      requestDate: req.date,
      approvalDate: new Date().toISOString().split("T")[0],
      status: "approved",
    };
    setAssignedAssets((prev) => [assign, ...prev]);

    const employee = employees.find((e) => e.id === req.employeeId);
    if (employee) {
      const hasAffiliation = (employee.affiliations || []).some((f) => f.active);
      if (!hasAffiliation) {
        setEmployees((prev) =>
          prev.map((e) =>
            e.id === employee.id
              ? { ...e, affiliations: [...(e.affiliations || []), { company: selectedCompany, active: true }] }
              : e
          )
        );
      }
      setEmployees((prev) => prev.map((e) => (e.id === employee.id ? { ...e, assetCount: (e.assetCount || 0) + 1 } : e)));
    }
  }

  function rejectRequest(requestId) {
    setRequests((prev) => prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r)));
  }

  function addAsset(newAsset) {
    const asset = { id: Date.now(), ...newAsset, date: newAsset.date || new Date().toISOString().split("T")[0] };
    setAssets((prev) => [asset, ...prev]);
    setActivePage("asset-list");
  }

  function deleteAsset(assetId) {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
  }

  function updateAsset(updated) {
    setAssets((prev) => prev.map((a) => (a.id === updated.id ? { ...a, ...updated } : a)));
  }

  function returnAssignedAsset(assignId) {
    const assign = assignedAssets.find((a) => a.id === assignId);
    if (!assign) return;
    setAssignedAssets((prev) => prev.map((a) => (a.id === assignId ? { ...a, status: "returned" } : a)));
    setAssets((prev) => prev.map((a) => (a.id === assign.assetId ? { ...a, quantity: (a.quantity || 0) + 1 } : a)));
  }

  function removeFromTeam(employeeId, company) {
    setEmployees((prev) =>
      prev.map((e) => ({
        ...e,
        affiliations: (e.affiliations || []).map((f) => (f.company === company ? { ...f, active: false } : f)),
      }))
    );
  }

  // Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredAssets = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return assets;
    return assets.filter((a) => a.name.toLowerCase().includes(s));
  }, [assets, search]);

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / pageSize));
  const assetsPage = filteredAssets.slice((page - 1) * pageSize, page * pageSize);

  function renderContent() {
    switch (activePage) {
      case "asset-list":
        return <AssetListPage assetsPage={assetsPage} search={search} setSearch={setSearch} page={page} setPage={setPage} totalPages={totalPages} deleteAsset={deleteAsset} updateAsset={updateAsset} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "add-asset":
        return <AddAssetPage addAsset={addAsset} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "all-requests":
        return <AllRequestsPage requests={requests} approveRequest={approveRequest} rejectRequest={rejectRequest} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "employee-list":
        return <EmployeeListPage employees={employees} removeFromTeam={removeFromTeam} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "upgrade-package":
        return <UpgradePackagePage PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "my-assets":
        return <MyAssetsPage assignedAssets={assignedAssets} returnAssignedAsset={returnAssignedAsset} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "request-asset":
        return <RequestAssetPage assets={assets} setRequests={setRequests} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "my-team":
        return <MyTeamPage employees={employees} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      case "profile":
        return <ProfilePage role={currentRole} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
      default:
        return <AssetListPage assetsPage={assetsPage} search={search} setSearch={setSearch} page={page} setPage={setPage} totalPages={totalPages} deleteAsset={deleteAsset} updateAsset={updateAsset} PRIMARY={PRIMARY} ACCENT={ACCENT} />;
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--accent)]" style={{ ['--primary']: PRIMARY, ['--accent']: ACCENT }}>
      {/* ============================================ */}
      {/* SIDEBAR - শুধুমাত্র এইটাই থাকবে DashboardLayout এ */}
      {/* ============================================ */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-[var(--primary)] transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4">
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

          {sidebarOpen && (
            <div className="mb-6 p-3 bg-[var(--accent)]/10 rounded-lg">
              <select
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  setActivePage(e.target.value === "hr" ? "asset-list" : "my-assets");
                }}
                className="w-full bg-[var(--accent)] text-[var(--primary)] px-3 py-2 rounded-lg font-semibold cursor-pointer"
              >
                <option value="hr">HR Manager</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          )}

          <nav className="space-y-2">
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActivePage(item.page)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activePage === item.page ? "bg-[var(--accent)] text-[var(--primary)]" : "text-[var(--accent)] hover:bg-[var(--accent)]/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {sidebarOpen && (
            <button className="w-full mt-8 flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* ============================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================ */}
      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 bg-white min-h-screen`}>
        <header className="shadow-sm sticky top-0 z-20 bg-white">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-[var(--primary)]">{menuItems.find((item) => item.page === activePage)?.label}</h1>
              <p className="text-sm text-gray-600">Welcome back! Manage your assets efficiently</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-[var(--primary)]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold">
                {currentRole === "hr" ? "HR" : "E"}
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}