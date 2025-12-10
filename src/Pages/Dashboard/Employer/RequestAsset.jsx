import React, { useState } from 'react';

const RequestAsset = ({ assets, setRequests, PRIMARY, ACCENT }) => {
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
};

export default RequestAsset;


// function RequestAssetPage({ assets, setRequests, PRIMARY, ACCENT }) {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [note, setNote] = useState("");

//   function handleRequestClick(asset) {
//     setSelectedAsset(asset);
//     setShowModal(true);
//   }

//   function handleSubmitRequest() {
//     if (!selectedAsset) return;
//     const req = {
//       id: Date.now(),
//       employeeId: 99,
//       employee: "You (demo)",
//       assetId: selectedAsset.id,
//       asset: selectedAsset.name,
//       date: new Date().toISOString().split("T")[0],
//       status: "pending",
//       note,
//     };
//     setRequests((prev) => [req, ...prev]);
//     setShowModal(false);
//     setNote("");
//   }

//   return (
//     <>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {assets.filter((a) => a.quantity > 0).map((asset) => (
//           <div key={asset.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
//             <div className="w-full h-32 bg-[var(--accent)] rounded-xl flex items-center justify-center text-5xl mb-4">{asset.image}</div>
//             <h3 className="text-xl font-bold text-[var(--primary)] mb-2">{asset.name}</h3>
//             <div className="space-y-2 mb-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Type:</span>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset.type === "Returnable" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{asset.type}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">Available:</span>
//                 <span className="text-lg font-bold text-[var(--primary)]">{asset.quantity}</span>
//               </div>
//             </div>
//             <button onClick={() => handleRequestClick(asset)} className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:shadow-lg transition">Request Asset</button>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full">
//             <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">Request Asset</h3>
//             <p className="text-gray-600 mb-4">Asset: <span className="font-bold text-[var(--primary)] ml-1">{selectedAsset?.name}</span></p>
//             <label className="block text-sm font-bold text-[var(--primary)] mb-2">Additional Note</label>
//             <textarea value={note} onChange={(e) => setNote(e.target.value)} rows="4" placeholder="Why do you need this asset?" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[var(--primary)]"></textarea>
//             <div className="flex space-x-3 mt-6">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold">Cancel</button>
//               <button onClick={handleSubmitRequest} className="flex-1 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold">Send Request</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }