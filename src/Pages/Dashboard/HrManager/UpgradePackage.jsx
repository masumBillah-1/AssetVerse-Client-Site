import React from 'react';
import { Crown } from 'lucide-react'; 
const UpgradePackage = ({ PRIMARY, ACCENT }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-[var(--primary)] mb-4 flex items-center">
        <Crown className="w-5 h-5 mr-2" /> Upgrade Package
      </h3>
      <p className="text-gray-600">This demo includes 3 package cards and a placeholder for Stripe Checkout. Integrate Stripe server + client to enable payments.</p>

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
            <div className="mt-4">
              <button className="px-3 py-2 bg-[var(--primary)] text-white rounded">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default UpgradePackage;



