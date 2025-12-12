import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxios from '../../../Hooks/useAxios';


const MyAssets = () => {
  const axiosPublic = useAxios();
  const { user } = useAuth();
  
  const [myAssets, setMyAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, approved, pending, returned

  useEffect(() => {
    if (user?.email) {
      fetchMyAssets();
    }
  }, [user]);

  const fetchMyAssets = async () => {
    try {
      setLoading(true);
      // Employee এর email দিয়ে তার সব requests fetch করা
      const response = await fetch(`http://localhost:3000/requests?employeeEmail=${user.email}`);
      const data = await response.json();
      setMyAssets(data);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (requestId) => {
    if (!window.confirm("Are you sure you want to return this asset?")) return;

    try {
      // Request status update করা
      await axiosPublic.patch(`/requests/${requestId}`, {
        requestStatus: "returned",
        returnDate: new Date()
      });

      // Local state update
      setMyAssets(prev => 
        prev.map(asset => 
          asset._id === requestId 
            ? { ...asset, requestStatus: "returned", returnDate: new Date() }
            : asset
        )
      );

      alert("✅ Asset returned successfully!");
    } catch (error) {
      console.error("Failed to return asset:", error);
      alert("❌ Failed to return asset!");
    }
  };

  const handlePrint = (asset) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Asset Details - ${asset.assetName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #06393a; }
            .info { margin: 10px 0; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Asset Details</h1>
          <div class="info"><span class="label">Asset:</span> ${asset.assetName}</div>
          <div class="info"><span class="label">Type:</span> ${asset.assetType}</div>
          <div class="info"><span class="label">Employee:</span> ${asset.employeeName}</div>
          <div class="info"><span class="label">Request Date:</span> ${new Date(asset.requestDate).toLocaleDateString()}</div>
          <div class="info"><span class="label">Status:</span> ${asset.requestStatus}</div>
          ${asset.approvalDate ? `<div class="info"><span class="label">Approval Date:</span> ${new Date(asset.approvalDate).toLocaleDateString()}</div>` : ''}
          <div class="info"><span class="label">Note:</span> ${asset.note}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Filter assets
  const filteredAssets = myAssets.filter(asset => {
    if (filter === "all") return true;
    return asset.requestStatus === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#06393a] mx-auto mb-4"></div>
          <p className="text-[#06393a] font-semibold">Loading your assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">


        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-600 mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-[#06393a]">{myAssets.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-2xl font-bold text-emerald-600">
              {myAssets.filter(a => a.requestStatus === "approved").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {myAssets.filter(a => a.requestStatus === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-sm text-gray-600 mb-1">Returned</p>
            <p className="text-2xl font-bold text-gray-600">
              {myAssets.filter(a => a.requestStatus === "returned").length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 inline-flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "all"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All ({myAssets.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "approved"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Approved ({myAssets.filter(a => a.requestStatus === "approved").length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "pending"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending ({myAssets.filter(a => a.requestStatus === "pending").length})
          </button>
          <button
            onClick={() => setFilter("returned")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === "returned"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Returned ({myAssets.filter(a => a.requestStatus === "returned").length})
          </button>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Assets Found</h3>
            <p className="text-gray-500">You haven't requested any assets yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset._id}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Asset Image */}
                <div className="w-full h-36 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden border border-[#06393a]/10">
  {asset.assetImage ? (
    <img 
      src={asset.assetImage} 
      alt={asset.assetName}
      className="w-full h-full object-contain"  // ← crop না হোক
    />
  ) : (
    <span className="text-5xl">📦</span>
  )}
</div>

                {/* Asset Info */}
                <h3 className="text-xl font-bold text-[#06393a] mb-2">{asset.assetName}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="px-3 py-1 bg-[#06393a]/10 text-[#06393a] rounded-full text-xs font-semibold capitalize">
                      {asset.assetType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        asset.requestStatus === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : asset.requestStatus === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : asset.requestStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {asset.requestStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Requested:</span>
                    <span className="text-xs font-semibold text-gray-700">
                      {new Date(asset.requestDate).toLocaleDateString()}
                    </span>
                  </div>

                  {asset.approvalDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Approved:</span>
                      <span className="text-xs font-semibold text-gray-700">
                        {new Date(asset.approvalDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {asset.returnDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Returned:</span>
                      <span className="text-xs font-semibold text-gray-700">
                        {new Date(asset.returnDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>


                {/* Action Buttons */}
                <div className="flex gap-2">
                  {asset.requestStatus === "approved" && (
                    <button
                      onClick={() => handleReturn(asset._id)}
                      className="flex-1 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all"
                    >
                      Return
                    </button>
                  )}
                  <button
                    onClick={() => handlePrint(asset)}
                    className="flex-1 py-2.5 bg-[#06393a] text-white rounded-lg text-sm font-semibold hover:bg-[#06393a]/90 transition-all"
                  >
                    Print
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssets;