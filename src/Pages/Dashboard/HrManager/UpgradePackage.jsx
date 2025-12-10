import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';

const UpgradePackage = () => {
  const axiosInstance = useAxios();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load packages from server
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosInstance.get('/packages');
        setPackages(res.data);
      } catch (err) {
        console.error('Failed to fetch packages:', err);
        Swal.fire('Error', 'Failed to fetch packages', 'error');
      }
    };
    fetchPackages();
  }, []);

  // Buy package → Stripe Checkout
  const handleBuy = async (pkg) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axiosInstance.post('/create-checkout-session', {
        packageId: pkg._id,
        packageName: pkg.name,
        price: pkg.price
      });

      if (res.data?.url) {
        window.location.assign(res.data.url);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      Swal.fire('Error', 'Cannot initiate checkout. Please try again.', 'error');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#06393a' }}>
        <Crown className="w-5 h-5 mr-2" color="#06393a" /> Upgrade Package
      </h3>
      <p className="mb-6" style={{ color: '#06393a' }}>
        Select a subscription package and complete the payment via Stripe.
      </p>

      {packages.length === 0 ? (
        <div className="text-center py-8" style={{ color: '#06393a' }}>Loading packages...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((p) => (
            <div
              key={p._id}
              className="p-4 rounded-xl border hover:shadow-md transition-all"
              style={{ borderColor: '#06393a' }}
            >
              <h4 className="font-bold text-lg" style={{ color: '#06393a' }}>{p.name}</h4>
              <p className="text-2xl font-bold mt-2" style={{ color: '#06393a' }}>
                ${p.price}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <p className="mt-3" style={{ color: '#06393a' }}>
                Employee limit: <span className="font-semibold">{p.limit}</span>
              </p>
              <button
                onClick={() => handleBuy(p)}
                disabled={loading}
                className="mt-4 w-full px-4 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                style={{ backgroundColor: '#06393a', color: 'white' }}
              >
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpgradePackage;
