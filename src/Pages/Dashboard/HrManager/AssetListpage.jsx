import React, { useEffect, useState } from 'react';
import { Package, FileText, Users, Search, Trash2, CheckCircle, Printer } from "lucide-react";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AssetListPage = () => {
  const axiosSecure = useAxiosSecure();


  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosSecure.get('/assets');
        setAssets(res.data || []);
        setTotalPages(Math.ceil((res.data?.length || 0) / pageSize));
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Poor Network 🛜", "error");
      }
    };
    fetchAssets();
  }, []);

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
        Swal.fire("Deleted!", "Asset has been deleted.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete asset", "error");
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

  return (
    <div className="space-y-6 p-10">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Assets", value: String(assets.length), icon: Package },
          { label: "Available", value: String(assets.filter(a => a.status === "available").length), icon: CheckCircle },
          { label: "Assigned", value: String(assets.filter(a => a.status === "assigned").length), icon: Users },
          { label: "Requests", value: "0", icon: FileText }
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
              {assetsPage.map(asset => (
                <tr key={asset._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-2xl">{asset.assetImage ? <img src={asset.assetImage} className="w-10 h-10 object-contain" /> : "–"}</td>
                  <td className="px-6 py-4">{asset.assetName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${asset.returnType === "returnable" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                      {asset.returnType}
                    </span>
                  </td>
                  <td className="px-6 py-4">{asset.quantity}</td>
                  <td className="px-6 py-4">{new Date(asset.addedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{asset.addedBy?.name || '-'}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    {asset.returnType === "returnable" && <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 transition">Return</button>}
                    <button onClick={() => handlePrint(asset)} className="btn btn-sm bg-[var(--primary)] text-white hover:opacity-90 transition flex items-center space-x-1">
                      <Printer className="w-4 h-4" /> <span>Print</span>
                    </button>
                    <button onClick={() => deleteAsset(asset._id)} className="btn btn-sm bg-red-100 text-red-700 flex items-center space-x-1">
                      <Trash2 className="w-4 h-4" /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
          <div className="flex space-x-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetListPage;
