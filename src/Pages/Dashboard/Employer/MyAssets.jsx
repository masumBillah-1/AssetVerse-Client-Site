import React from 'react';

const MyAssets = ({ assignedAssets, returnAssignedAsset, PRIMARY, ACCENT }) => {
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
};

export default MyAssets;

