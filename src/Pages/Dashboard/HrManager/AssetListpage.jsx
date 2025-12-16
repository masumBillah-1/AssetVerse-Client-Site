import React, { useEffect, useState } from 'react';
import { Package, FileText, Users, Search, Trash2, CheckCircle, Printer, Edit } from "lucide-react";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

// Import Charts
import ReturnableAssetsChart from './ReturnableAssetsChart';
import TopRequestedAssetsChart from './TopRequestedAssetsChart';
import NotificationAnalytics from '../../../Components/NotificationAnalytics';

const AssetListPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingCount, setPendingCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Edit Modal States
  const [editingAsset, setEditingAsset] = useState(null);
  const [editFormData, setEditFormData] = useState({
    assetName: '',
    quantity: 0,
    assetImage: ''
  });
  const [updating, setUpdating] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    const fetchAssets = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Get user data to find their _id
        const userRes = await axiosSecure.get(`/users/${user.email}`);
        
        if (!userRes.data.success || !userRes.data.user) {
          // console.error('❌ User not found');
          Swal.fire({
            icon: "error",
            title: "User Not Found",
            text: "Could not fetch user data. Please login again.",
            confirmButtonColor: '#06393a'
          });
          setLoading(false);
          return;
        }

        const currentUser = userRes.data.user;
        // console.log('✅ Current user:', currentUser);

        // Determine companyId
        let userCompanyId;
        if (currentUser.role === "hr") {
          userCompanyId = currentUser._id;
        } else if (currentUser.role === "employee") {
          userCompanyId = currentUser.affiliatedCompanies?.[0];
        }

        if (!userCompanyId) {
          console.error('❌ Company ID not found');
          Swal.fire({
            icon: "warning",
            title: "No Company Found",
            text: "You are not affiliated with any company yet.",
            confirmButtonColor: '#06393a'
          });
          setLoading(false);
          return;
        }

        console.log('✅ Company ID:', userCompanyId);
        setCompanyId(userCompanyId);

        // Fetch assets with companyId filter
        const res = await axiosSecure.get('/assets', {
          params: { companyId: userCompanyId }
        });
        
        const fetchedAssets = res.data || [];
        console.log('✅ Assets fetched:', fetchedAssets.length);
        
        setAssets(fetchedAssets);
        setTotalPages(Math.ceil(fetchedAssets.length / pageSize));

        // Fetch ALL requests for this company
        const requestsRes = await axiosSecure.get('/requests', {
          params: { companyId: userCompanyId }
        });
        
        const allRequests = requestsRes.data || [];
        // console.log('✅ Requests fetched:', allRequests.length);
        
        // Count pending requests for this company
        const pendingRequestsCount = allRequests.filter(req => req.requestStatus === 'pending').length;
        setPendingCount(pendingRequestsCount);

        // Count assigned/approved requests for this company
        const assignedRequestsCount = allRequests.filter(req => req.requestStatus === 'approved').length;
        setAssignedCount(assignedRequestsCount);

        setLoading(false);

      } catch (err) {
        // console.error('❌ Error fetching data:', err);
        
        // More specific error messages
        if (err.response) {
          // Server responded with error
          // console.error('Server Error:', err.response.data);
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: err.response.data?.error || err.response.data?.message || "Failed to fetch data",
            confirmButtonColor: '#06393a'
          });
        } else if (err.request) {
          // Request made but no response
          // console.error('Network Error:', err.request);
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Poor Network Connection 🛜. Please check your internet.",
            confirmButtonColor: '#06393a'
          });
        } else {
          // Something else happened
          // console.error('Error:', err.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An unexpected error occurred. Please try again.",
            confirmButtonColor: '#06393a'
          });
        }
        
        setLoading(false);
      }
    };

    fetchAssets();
  }, [user?.email, axiosSecure]);

  const deleteAsset = async (id) => {
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will delete this asset permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmed.isConfirmed) {
        await axiosSecure.delete(`/assets/${id}`);
        setAssets(prev => prev.filter(asset => asset._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Asset has been deleted.",
          confirmButtonColor: '#06393a'
        });
      }
    } catch (err) {
      // console.error('❌ Delete error:', err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete asset",
        confirmButtonColor: '#06393a'
      });
    }
  };

  // ✅ Open Edit Modal
  const handleEditClick = (asset) => {
    setEditingAsset(asset);
    setEditFormData({
      assetName: asset.assetName,
      quantity: asset.quantity,
      assetImage: asset.assetImage || ''
    });
    document.getElementById('edit_asset_modal').showModal();
  };

  // ✅ Handle Form Input Changes
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  // ✅ Submit Updated Asset
  const handleUpdateAsset = async () => {
    if (!editFormData.assetName.trim() || editFormData.quantity < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please provide valid asset name and quantity.',
        confirmButtonColor: '#06393a'
      });
      return;
    }

    setUpdating(true);

    try {
      const updateData = {
        assetName: editFormData.assetName.trim(),
        quantity: editFormData.quantity,
        assetImage: editFormData.assetImage.trim(),
        updatedAt: new Date()
      };

      await axiosSecure.patch(`/assets/${editingAsset._id}`, updateData);

      // Update local state
      setAssets(prev => prev.map(asset => 
        asset._id === editingAsset._id 
          ? { ...asset, ...updateData }
          : asset
      ));

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Asset has been updated successfully.',
        confirmButtonColor: '#06393a'
      });

      // Close modal
      document.getElementById('edit_asset_modal').close();
      setEditingAsset(null);
      setEditFormData({ assetName: '', quantity: 0, assetImage: '' });

    } catch (err) {
      // console.error('❌ Update error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update asset. Please try again.',
        confirmButtonColor: '#06393a'
      });
    } finally {
      setUpdating(false);
    }
  };

  // Print single asset slip
  const handlePrint = (asset) => {
    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Asset Slip</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            .asset-info { margin-bottom: 10px; }
            .asset-info strong { display: inline-block; width: 120px; }
            .divider { margin: 15px 0; border-top: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h2>Asset Slip</h2>
          <div class="asset-info"><strong>Name:</strong> ${asset.assetName}</div>
          <div class="asset-info"><strong>Type:</strong> ${asset.assetType}</div>
          <div class="asset-info"><strong>Quantity:</strong> ${asset.quantity}</div>
          <div class="asset-info"><strong>Return Type:</strong> ${asset.returnType}</div>
          <div class="asset-info"><strong>Added By:</strong> ${asset.addedBy?.name || '-'}</div>
          <div class="asset-info"><strong>Date:</strong> ${new Date(asset.addedAt).toLocaleDateString()}</div>
          <div class="divider"></div>
          <p>Signature: ________________________</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const filteredAssets = assets.filter(a => a.assetName.toLowerCase().includes(search.toLowerCase()));
  const assetsPage = filteredAssets.slice((page - 1) * pageSize, page * pageSize);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#06393a] mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-[#06393a]">Loading Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-5">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: String(assets.length), icon: Package },
          { label: "Available", value: String(assets.filter(a => a.status === "available").length), icon: CheckCircle },
          { label: "Assigned", value: assignedCount, icon: Users },
          { label: "Requests", value: pendingCount, icon: FileText }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[var(--primary)]/10 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100`}>
                <stat.icon className="w-6 h-6 text-[var(--primary)]" />
              </div>
            </div>
            <div className="text-3xl font-black text-[var(--primary)]">{stat.value}</div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {companyId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReturnableAssetsChart companyId={companyId} />
          <TopRequestedAssetsChart companyId={companyId} />
        </div>
      )}

      {/* Notification Analytics */}
      {companyId && (
        <div>
          <NotificationAnalytics companyId={companyId} />
        </div>
      )}

      {/* Assets Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[var(--primary)]">All Assets</h3>
          <div className="relative w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              type="text" 
              placeholder="Search assets..." 
              className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)] focus:outline-none w-full" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-[var(--primary)]/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Image</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Type</th>
                <th className="px-3 py-3 text-left text-sm font-bold text-[var(--primary)]">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">HR Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-[var(--primary)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assetsPage.length > 0 ? (
                assetsPage.map(asset => (
                  <tr key={asset._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-2xl">
                      {asset.assetImage ? 
                        <img src={asset.assetImage} className="w-10 h-10 object-contain" alt={asset.assetName} /> 
                        : "–"
                      }
                    </td>
                    <td className="px-1 text-[12px] py-1 font-bold">{asset.assetName}</td>
                    <td className=" py-1">
                      <span className={`px-3 py-1 text-[12px] rounded-lg text-sm font-semibold ${asset.returnType === "returnable" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                        {asset.returnType}
                      </span>
                    </td>
                    <td className="px-2 text-center py-2">{asset.quantity}</td>
                    <td className="px-2 py-2 text-center">{new Date(asset.addedAt).toLocaleDateString()}</td>
                    <td className="px-1 text-[13px] font-medium text-center py-1">{asset.addedBy?.name || '-'}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      {/* ✅ Edit Button */}
                      <button 
                        onClick={() => handleEditClick(asset)} 
                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition flex items-center space-x-1"
                        title="Edit Asset"
                      >
                        <Edit className="w-4 h-4" /> <span>Edit</span>
                      </button>

                      {asset.returnType === "returnable" && (
                        <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 transition">
                          Return
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handlePrint(asset)} 
                        className="btn btn-sm bg-[var(--primary)] text-white hover:opacity-90 transition flex items-center space-x-1"
                      >
                        <Printer className="w-4 h-4" /> <span>Print</span>
                      </button>
                      
                      <button 
                        onClick={() => deleteAsset(asset._id)} 
                        className="btn btn-sm bg-red-100 text-red-700 flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" /> <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {page} of {totalPages || 1}</div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages || totalPages === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Edit Modal - DaisyUI */}
      <dialog id="edit_asset_modal" className="modal">
        <div className="modal-box md:max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-[var(--primary)]">Edit Asset</h3>
            <p className="text-sm text-gray-600">Update asset information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Image Preview */}
            <div className="flex items-center justify-center">
              <div className="w-full h-64 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center p-4">
                {editFormData.assetImage ? (
                  <img 
                    src={editFormData.assetImage} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-sm text-center">Image preview will appear here</span>
                )}
                <div style={{display: 'none'}} className="flex-col items-center justify-center text-gray-400 text-sm">
                  <span>Invalid image URL</span>
                </div>
              </div>
            </div>

            {/* Right Side - Input Fields */}
            <div className="space-y-3">
              {/* Asset Name */}
              <div>
                <label className="block text-sm font-bold text-[var(--primary)] mb-1">
                  Asset Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="assetName"
                  value={editFormData.assetName}
                  onChange={handleEditInputChange}
                  placeholder="Enter asset name"
                  className="input input-bordered w-full focus:border-[var(--primary)]"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-[var(--primary)] mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editFormData.quantity}
                  onChange={handleEditInputChange}
                  min="0"
                  placeholder="Enter quantity"
                  className="input input-bordered w-full focus:border-[var(--primary)]"
                />
              </div>

              {/* Asset Image URL */}
              <div>
                <label className="block text-sm font-bold text-[var(--primary)] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="assetImage"
                  value={editFormData.assetImage}
                  onChange={handleEditInputChange}
                  placeholder="Enter image URL"
                  className="input input-bordered w-full focus:border-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          <div className="modal-action mt-4">
            <form method="dialog" className="flex gap-2 w-full">
              <button 
                type="button"
                onClick={handleUpdateAsset}
                disabled={!editFormData.assetName.trim() || updating}
                className={`btn flex-1 ${
                  editFormData.assetName.trim() && !updating
                    ? "bg-[var(--primary)] text-white hover:opacity-90"
                    : "btn-disabled"
                }`}
              >
                {updating ? 'Updating...' : 'Update Asset'}
              </button>
              <button type="submit" className="btn btn-ghost" disabled={updating}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssetListPage;