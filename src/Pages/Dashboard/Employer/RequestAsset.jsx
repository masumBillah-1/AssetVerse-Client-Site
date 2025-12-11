import React, { useState, useEffect } from 'react';

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("all"); // all, returnable, non-returnable

  // Fetch assets from MongoDB
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/assets');
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestClick = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedAsset) return;
    
    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.assetName,
      note: note,
      requestDate: new Date(),
      status: "pending"
    };

    console.log("Request submitted:", requestData);
    // Here you can add API call to save the request
    
    setShowModal(false);
    setNote("");
    setSelectedAsset(null);
  };

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    if (filter === "all") return asset.quantity > 0;
    if (filter === "returnable") return asset.returnType === "returnable" && asset.quantity > 0;
    if (filter === "non-returnable") return asset.returnType === "non-returnable" && asset.quantity > 0;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#06393a] mx-auto mb-4"></div>
          <p className="text-[#06393a] font-semibold">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#06393a] mb-2">Request Asset</h1>
          <p className="text-gray-600">Browse and request available assets for your work</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 inline-flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
              filter === "all"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Assets ({assets.filter(a => a.quantity > 0).length})
          </button>
          <button
            onClick={() => setFilter("returnable")}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
              filter === "returnable"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Returnable ({assets.filter(a => a.returnType === "returnable" && a.quantity > 0).length})
          </button>
          <button
            onClick={() => setFilter("non-returnable")}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
              filter === "non-returnable"
                ? "bg-[#06393a] text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Non-Returnable ({assets.filter(a => a.returnType === "non-returnable" && a.quantity > 0).length})
          </button>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Assets Available</h3>
            <p className="text-gray-500">There are no assets matching your criteria at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredAssets.map((asset) => (
              <div
                key={asset._id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Asset Image */}
                <div className="w-full h-32 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden border border-[#06393a]/10">
                  {asset.assetImage && asset.assetImage.startsWith('data:image') ? (
                    <img 
                      src={asset.assetImage} 
                      alt={asset.assetName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">{asset.assetImage || '📦'}</span>
                  )}
                </div>

                {/* Asset Info */}
                <h3 className="text-lg font-bold text-[#06393a] mb-2 truncate">{asset.assetName}</h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Type:</span>
                    <span className="px-2 py-1 bg-[#06393a]/10 text-[#06393a] rounded-full text-xs font-semibold capitalize">
                      {asset.assetType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs  text-gray-600">Return:</span>
                    <span
                      className={`px-2  py-1 rounded-full text-xs font-bold ${
                        asset.returnType === "returnable"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {asset.returnType === "returnable" ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Available:</span>
                    <span className="text-xl font-bold text-[#06393a]">{asset.quantity}</span>
                  </div>
                </div>

                {/* Request Button */}
                <button
                  onClick={() => handleRequestClick(asset)}
                  className="w-full py-2.5 cursor-pointer bg-[#06393a] text-white rounded-lg text-sm font-semibold hover:bg-[#06393a]/90 hover:shadow-lg transition-all duration-300"
                >
                  Request Asset
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-slideUp">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#06393a]/20">
                <span className="text-3xl">
                  {selectedAsset?.assetImage && !selectedAsset.assetImage.startsWith('data:image') 
                    ? selectedAsset.assetImage 
                    : '📦'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#06393a] mb-2">Request Asset</h3>
              <p className="text-gray-600">
                Asset: <span className="font-bold text-[#06393a]">{selectedAsset?.assetName}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-[#06393a] mb-2">
                Additional Note <span className="text-red-500">*</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="4"
                placeholder="Why do you need this asset?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#06393a] focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNote("");
                  setSelectedAsset(null);
                }}
                className="flex-1 cursor-pointer py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitRequest}
                disabled={!note.trim()}
                className={`flex-1 py-3 rounded-xl cursor-pointer font-semibold transition-all ${
                  note.trim()
                    ? "bg-[#06393a]  text-white hover:bg-[#06393a]/90 hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RequestAsset;